from rest_framework import pagination

class ManufacturerPagination(pagination.LimitOffsetPagination):
    template = None