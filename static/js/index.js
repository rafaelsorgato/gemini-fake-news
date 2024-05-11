const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");


const BOT_IMG = "https://www.svgrepo.com/show/339963/chat-bot.svg";
const PERSON_IMG = "https://www.svgrepo.com/show/530585/user.svg";
const BOT_NAME = "Gemini";
const PERSON_NAME = "You";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value.trim();
  const imageInput = document.getElementById('image-input');
  const msgImage = imageInput.files[0];

  if (!msgText && !msgImage) return;

  if (msgText) {
    sendMessage(msgText);
  }
  if (msgImage) {
    sendImage(msgImage);
  }
  imageInput.value = null;
  msgerInput.value = "";
});

function sendMessage(text) {
  fetch("/send-message", {
    method: "POST",
    body: JSON.stringify({ message: text }),
    headers: { "Content-Type": "application/json" }
  })
  .then(handleResponse)
  .catch(handleError);
}

function sendImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  fetch("/send-image", {
    method: "POST",
    body: formData
  })
  .then(handleResponse)
  .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    console.error("Error:", response.statusText);
    return;
  }
  return response.json();
}

function handleError(error) {
  console.error("Error:", error);
}


function sendMessage(text) {
  fetch("/send-message", {
    method: "POST",
    body: JSON.stringify({ message: text }),
    headers: { "Content-Type": "application/json" }
  })
  .then(handleResponse)
  .catch(handleError);
}

function sendImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  fetch("/send-image", {
    method: "POST",
    body: formData
  })
  .then(handleResponse)
  .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    console.error("Error:", response.statusText);
    return;
  }
  return response.json().then(data => {
    const botMsg = data.status || "An unexpected response"; // Use data.status from the response
    appendMessage(BOT_NAME, BOT_IMG, "left", botMsg); // Use appendMessage to display the bot's message
  });
}

function handleError(error) {
  console.error("Error:", error);
}




function appendMessage(name, img, side, content) {
  let msgHTML;
  if (typeof content === 'string') {
    msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
          </div>

          <div class="msg-text">${content}</div>
        </div>
      </div>
    `;
  } else if (content instanceof File) {
    const imageUrl = URL.createObjectURL(content);
    msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
          </div>

          <div class="msg-text">
            <img src="${imageUrl}" alt="uploaded-image" style="max-width: 100%;">
          </div>
        </div>
      </div>
    `;
  }

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}



function get(selector, root = document) {
  return root.querySelector(selector);
}



