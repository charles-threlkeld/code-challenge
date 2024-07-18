import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        input_string = request.GET.get("address")
        try:
            address_components, address_type = parse(input_string)
            return Response({"input_string": input_string,
                             "address_components": address_components,
                             "address_type": address_type})
        except usaddress.RepeatedLabelError:
            return Response({})

    def parse(self, address):
        # We'll let our library to the heavy lifting here
        return usaddress.tag(address)
