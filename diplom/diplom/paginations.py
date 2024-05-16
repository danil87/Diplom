from rest_framework import pagination

class CustomPagination(pagination.LimitOffsetPagination):
    def paginate_queryset(self, queryset, request, view=None):
        if 'id' in view.kwargs:
            return None
        
        if 'no_page' in request.query_params:
            return None

        return super().paginate_queryset(queryset, request, view)