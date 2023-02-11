from django.db import connection

def is_subset(skills, problem): #true if arr2 is subset of arr1
    """# Using STL set for hashing
    hashset = set()
    m = len(arr1)
    n = len(arr2)
    # hset stores all the values of arr1
    for i in range(0, m):
        hashset.add(arr1[i])
 
    # Loop to check if all elements
    # of arr2 also lies in arr1
    for i in range(0, n):
        if arr2[i] in hashset:
            continue
        else:
            return False
 
    return True"""
    for word in problem:
        if word in skills:
            return True
    return False



def my_custom_sql(skills_to_query):

    with connection.cursor() as cursor:#delete old meetings
        
        cursor.execute("""
            delete FROM "public"."helpers_meetingtable" where current_date > to_date(meetingdate_long, 'YYYY/DD/MM')
        """)
        



    query = """select date, name
                            from "public"."helpers_helperdate"
            """
    if len(skills_to_query) == 0:
        query = """select date, name
                            from "public"."helpers_helperdate"
                """
    
    else:
        query = """select date, array_agg(name)
                from "public"."helpers_helperdate"
                where name in
                (select distinct name from "public"."helpers_helperskill" 
                where concat(name, date) not in (select concat(helpername, meetingdate) from "public"."helpers_meetingtable") and
                """
    for i, skill in enumerate(skills_to_query):
        if i == 0 and len(skills_to_query) == 1:
            query += """name in (select name from "public"."helpers_helperskill" where skill = '"""+skill+"""')) group by 1"""
        elif i == 0 and len(skills_to_query) > 1:
            query += """name in (select name from "public"."helpers_helperskill" where skill = '"""+skill+"""')"""
        elif i == len(skills_to_query) - 1:
            query += """ and name in (select name from "public"."helpers_helperskill" where skill = '"""+skill+"""')) group by 1"""
        else:
            query += """ and name in (select name from "public"."helpers_helperskill" where skill = '"""+skill+"""')"""


        
    
    with connection.cursor() as cursor:
        
        cursor.execute(query)
        row = cursor.fetchall()

    return row

