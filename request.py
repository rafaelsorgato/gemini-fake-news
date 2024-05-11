import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown



def to_markdown(text):
  text = text.replace('•', '  *')
  print(textwrap.indent(text, '> ', predicate=lambda _: True))
    
genai.configure(api_key="AIzaSyAqxRU5in96CR9tbnwJqJxC__M203csSAU")

model = genai.GenerativeModel('gemini-1.0-pro')

response = model.generate_content("estou fazendo um teste, me responda com 'oi'")

to_markdown(response.text)