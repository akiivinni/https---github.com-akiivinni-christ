document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    const participants = [
        { "name": "snowflakes", "giftRecipient": "summanth", imageurl:"images/snow.jpg"},
        { "name": "merrychristmas", "giftRecipient": "VidyaSree",  imageurl:"images/merrychristmas.jpg"},
        { "name": "candy", "giftRecipient": "Sayantan",imageurl:"images/Candy.jpg" },
        { "name": "santaclaus", "giftRecipient": "Sai" ,imageurl:"images/santaclaus.png"},
        { "name": "present", "giftRecipient": "Pavana",imageurl:"images/gifts.png" },
        { "name": "garland", "giftRecipient": "Preeti" ,imageurl:"images/garland.jpg"},
        { "name": "holiday", "giftRecipient": "Pradeep" ,imageurl:"images/image9.png"},
        { "name": "cupcake", "giftRecipient": "Nithin" ,imageurl:"images/cupcake.jpg"},
        { "name": "christmaseve", "giftRecipient": "Akanksha",imageurl:"images/eve.jpg" },
        { "name": "holidayparty", "giftRecipient": "Harish",imageurl:"images/image6.png" },
        { "name": "carols", "giftRecipient": "Devika" ,imageurl:"images/carols.jpg"},
        { "name": "jinglebell", "giftRecipient": "Sanjukta",imageurl:"images/jinglebell.jpg" },
        { "name": "snowglobe", "giftRecipient": "Ganeshan" ,imageurl:"images/snowglobe.jpg"},
        { "name": "festive season", "giftRecipient": "Varuni" ,imageurl:"images/image18.png"},
        { "name": "jesus", "giftRecipient": "Harika",imageurl:"images/jesus.jpg" },
        { "name": "angel", "giftRecipient": "Supradeep",imageurl:"images/angel.jpg" },
        { "name": "clara", "giftRecipient": "Abdullah",imageurl:"images/merry.png" },
        { "name": "snowmen", "giftRecipient": "Renjusha",imageurl:"images/snowmen.jpg" },
        { "name": "holly", "giftRecipient": "Yugo jyoti",imageurl:"images/holly.jpg" },
        { "name": "christamstree", "giftRecipient": "Seema",imageurl:"images/trees.jpg" },
        { "name": "candles", "giftRecipient": "Boopathi" ,imageurl:"images/candels.jpg"},
        { "name": "joy", "giftRecipient": "Sithun" ,imageurl:"images/joy.jpg"},
        { "name": "reindeer", "giftRecipient": "Akhila" ,imageurl:"images/reindeer.webp"},
        { "name": "blessings", "giftRecipient": "Pooja",imageurl:"images/bless.jpg" },
        { "name": "christmasstar", "giftRecipient": "Usha",imageurl:"images/star.jpg" },
       
    ];

    const cardContainer = document.getElementById("card-container");

    // Render each participant's card, but without displaying their name
    participants.forEach((participant) => {
        const cardItem = document.createElement("li");
        cardItem.classList.add("card-item");
        cardItem.innerHTML = `
            <a href="#" class="card">
            <p class="card__descr">${participant.name}</p>
                <img src=${participant.imageurl} class="card__image" alt="" />
                
                <div class="card__overlay">
                    <div class="card__header-text">
                        <h3 class="card__title" style="display: none;">${participant.name}</h3>
                    </div>
                    <input type="text" class="card-name-input" placeholder="Enter Name..." />
                    <button class="send-pdf-btn">Send PDF</button>
                </div>
            </a>
        `;
        cardContainer.appendChild(cardItem);
    });

    const sendPdfButtons = document.querySelectorAll('.send-pdf-btn');
    sendPdfButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card-item'); 
            const input = card.querySelector('.card-name-input'); 
            const name = input.value.trim(); 

            if (!name) {
                alert("Please enter a name!");
                return;
            }

            
            const participant = participants.find(p => p.name === name);
            if (!participant) {
                alert("Invalid name entered!");
                return;
            }

            // Disable all other cards
            const allCards = document.querySelectorAll('.card-item');
            allCards.forEach(otherCard => {
                const otherButton = otherCard.querySelector('.send-pdf-btn');
                const otherInput = otherCard.querySelector('.card-name-input');
                const otherName = otherCard.querySelector('.card__title').textContent.trim();

                if (otherName !== name) {
                    otherButton.disabled = true;
                    otherInput.disabled = true;
                }
            });

          
            const doc = new jsPDF();
         
let yPosition = 20;
const marginLeft = 10;
const marginTop = 20;


doc.setFont("helvetica", "normal");
doc.setFontSize(12);

doc.text(`Hello ${name}`, marginLeft, yPosition);
yPosition += 15; 

let message1 = `'Tis the season to be jolly, and our Christmas party is the 
perfect place to celebrate!`;
doc.text(message1, marginLeft, yPosition, );
yPosition += 20;

let message2 = `Get ready to jingle and mingle with your colleagues at our
festive office Christmas celebration.`;
doc.text(message2, marginLeft, yPosition, );
yPosition += 20; 

let message3 = `Santa's making a special stop at [Accenture, BDC14B] 
this year!`;
doc.text(message3, marginLeft, yPosition);
yPosition += 20; 

let message4 = `Join us for some holiday cheer on [date] at
[venue] from [time].
Don't miss out on the fun!`;
doc.text(message4, marginLeft, yPosition, );
yPosition += 30; 

let message5 = `Deck the halls, and remember to grab a gift for 
${participant.giftRecipient}!`;
doc.text(message5, marginLeft, yPosition, );
yPosition += 20; 

yPosition += 10;

doc.setFont("helvetica", "bold");
doc.text(`Wrapped it once, and then once more,`, marginLeft, yPosition);
yPosition += 12;
doc.text(`Tape stuck to me, not the floor.`, marginLeft, yPosition);
yPosition += 12;
doc.text(`By the time I’m finally through,`, marginLeft, yPosition);
yPosition += 12;
doc.text(`The gift’s unwrapped by YOU-KNOW-WHO!`, marginLeft, yPosition);
yPosition += 20; 
doc.setFont("helvetica", "normal");
doc.text(`Thanks, Innovation & Technology | Global HR`, marginLeft, yPosition);
            doc.save(`${name}_gift.pdf`);
           
            setTimeout(() => {
                card.remove(); 
            }, 500);  
        });
    });
});
