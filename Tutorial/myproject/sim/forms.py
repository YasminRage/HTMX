from django import forms


class SampleForm(forms.Form):
    name = forms.CharField(min_length=3)
    email = forms.CharField()
    favourite_color = forms.CharField()
