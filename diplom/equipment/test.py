from rest_framework.test import APITestCase
from rest_framework import status
from user.models import User

data = {
  'username': 'test', 'password': 'test', 'first_name': 'test', 'last_name': 'test', 
  'role':'test'
}

class EquipmentTests(APITestCase):

  def setUp(self):
    response = self.client.post('/api/v1/auth/create', data=data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_get_equipments(self):
    response = self.client.post('/api/v1/auth/login', data={'username': 'test', 'password': 'test'})
    self.assertEqual(response.status_code, status.HTTP_200_OK)

    response = self.client.get('/api/v1/equipments/', headers={'Authorization': f'Bearer {response.data["access"]}'})
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['results'], [])

    