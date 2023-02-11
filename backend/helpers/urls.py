from django.conf.urls import url 
from helpers import views 
 
urlpatterns = [ 
    url(r'^api/helpers', views.helper_list),
    url(r'^api/helpers/(?P<pk>[0-9]+)$', views.helper_detail),
    url(r'^api/helpers/published$', views.helper_list_published),

   # url(r'^api/problems', views.problem_list),
    #url(r'^api/problems', views.helper_matched),
    url(r'^api/calendar', views.getCalendar),
    url(r'^api/meeting-table', views.meetings_table),
    url(r'^api/create-room', views.createRoom),
    url(r'^api/test-payment/$', views.test_payment),
    url(r'^api/save-stripe-info/$', views.save_stripe_info)



]