from flask import Flask, render_template,request
import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
import PIL.Image

app = Flask(__name__)

@app.route('/')
def hello_world():
  """
  Exibe uma página HTML simples com uma mensagem de boas-vindas.
  """
  return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def receive_message():
    if request.method == 'POST':
        message_data = request.get_json()
        message = message_data['message']
        response = to_markdown(message)
        return{ 'status': response }
    
@app.route('/send-image', methods=['POST'])
def receive_image():
    if request.method == 'POST':
        if 'image' not in request.files:
            return { 'status': 'sem imagem' }
        image_file = request.files['image']
        image_file = PIL.Image.open(image_file)
        response=to_markdown(image_file)
        return { 'status': response }


def to_markdown(message):
    genai.configure(api_key="")

    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
    }

    safety_settings = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
    ]

    system_instruction = "vi essa notifica na internet, poderia me informar se ela se trata de fake news ou se é verdadeira? \n\nme de uma resposta curta e com no mínimo 3 pontos explicando o motivo.\nexemplos de respostas:\nA notifica se trata de fake news por 3 motivos: 1-tal motivo. 2-por não possuir. 3-por que não é assim. OU: Não se trata de fake news ou é uma informação que não pude identificar a veracidade"

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              system_instruction=system_instruction,
                              safety_settings=safety_settings)

    convo = model.start_chat()
    convo.send_message(message)
    return(convo.last.text)
if __name__ == '__main__':
  app.run(debug=True)
