document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    const participants = [
        { "name": "snowflake", "giftRecipient": "summanth", imageurl:"images/image19.png"},
        { "name": "christmas", "giftRecipient": "VidyaSree",  imageurl:"images/image5.png"},
        { "name": "candy", "giftRecipient": "Sayantan",imageurl:"images/Candy.jpg" },
        { "name": "santa", "giftRecipient": "Sai" ,imageurl:"images/santa.png"},
        { "name": "gift", "giftRecipient": "Pavana",imageurl:"images/gifts.png" },
        { "name": "xmas", "giftRecipient": "Preeti" ,imageurl:"images/christmastree.png"},
        { "name": "holiday", "giftRecipient": "Pradeep" ,imageurl:"images/image9.png"},
        { "name": "plumcake", "giftRecipient": "Nithin" ,imageurl:"images/image12.png"},
        { "name": "christmaseve", "giftRecipient": "Akanksha",imageurl:"images/image5.png" },
        { "name": "holidayparty", "giftRecipient": "Harish",imageurl:"images/image6.png" },
        { "name": "carols", "giftRecipient": "Devika" ,imageurl:"images/image16.png"},
        { "name": "jinglebell", "giftRecipient": "Sanjukta",imageurl:"images/image16.png" },
        { "name": "yule", "giftRecipient": "Ganeshan" ,imageurl:"images/image14.png"},
        { "name": "festive season", "giftRecipient": "Varuni" ,imageurl:"images/image18.png"},
        { "name": "jesaus", "giftRecipient": "Harika",imageurl:"images/image10.png" },
        { "name": "angel", "giftRecipient": "Supradeep",imageurl:"images/image14.png" },
        { "name": "clara", "giftRecipient": "Abdullah",imageurl:"images/merry.png" },
        { "name": "december", "giftRecipient": "Renjusha",imageurl:"images/image12.png" },
        { "name": "holly", "giftRecipient": "Yugo jyoti",imageurl:"images/image17.png" },
        { "name": "christams Tree", "giftRecipient": "Seema",imageurl:"images/image18.png" },
        { "name": "Candels", "giftRecipient": "Boopathi" ,imageurl:"images/image12.png"},
        { "name": "joy", "giftRecipient": "Sithun" ,imageurl:"images/image5.png"},
        { "name": "spark", "giftRecipient": "Akhila" ,imageurl:"images/image13.png"},
        { "name": "blessings", "giftRecipient": "Pooja",imageurl:"images/image11.png" },
        { "name": "christams ball", "giftRecipient": "Usha",imageurl:"images/image5.png" },
       
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

            // Find the participant with the entered name
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
            doc.text(`Hello ${name}`, 10, 20);
            doc.text(`Hi, Tis the season to be jolly and our Christmas party is just the place for it!`, 10, 30);
            doc.text(`Get ready to jingle and mingle at our office Christmas party.`, 10, 40);
                      
            doc.text(`You'll be buying a gift for ${participant.giftRecipient}!`, 10, 50);
            
         
            doc.save(`${name}_gift.pdf`);
           
            setTimeout(() => {
                card.remove(); 
            }, 500);  
        });
    });
});
