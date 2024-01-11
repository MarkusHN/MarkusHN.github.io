document.getElementById("addContentButton").addEventListener("click", function () {
    var imageInput = document.getElementById("imageInput");
    var descriptionInput = document.getElementById("descriptionInput");

    if (imageInput.files.length > 0) {
        var newContentContainer = document.createElement("div");
        var newImage = document.createElement("img");
        newImage.src = URL.createObjectURL(imageInput.files[0]);
        newImage.alt = "User-uploaded image";

        // Set a fixed width for all images (adjust as needed)
        newImage.style.width = "200px"; 

        var newText = document.createElement("p");
        newText.textContent = descriptionInput.value || "No description provided";

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            // Remove the content container when the "Remove" button is clicked
            newContentContainer.remove();

            // Remove the image information from localStorage
            removeImageInformation(newImage.src);
        });

        newContentContainer.appendChild(newImage);
        newContentContainer.appendChild(newText);
        newContentContainer.appendChild(removeButton);

        document.getElementById("dynamicContentContainer").appendChild(newContentContainer);

        // Store the image information in localStorage
        storeImageInformation(newImage.src, newText.textContent);
        
        // Clear input fields
        imageInput.value = "";
        descriptionInput.value = "";
    } else {
        alert("Please select an image before adding content.");
    }
});

// Load existing images from localStorage on page load
window.onload = function () {
    loadStoredImages();
};

function storeImageInformation(imageSrc, imageDescription) {
    // Retrieve existing stored images
    var storedImages = JSON.parse(localStorage.getItem("userUploadedImages")) || [];

    // Add the new image information
    storedImages.push({ src: imageSrc, description: imageDescription });

    // Store the updated images in localStorage
    localStorage.setItem("userUploadedImages", JSON.stringify(storedImages));
}

function removeImageInformation(imageSrc) {
    // Retrieve existing stored images
    var storedImages = JSON.parse(localStorage.getItem("userUploadedImages")) || [];

    // Remove the image information
    storedImages = storedImages.filter(function (imageInfo) {
        return imageInfo.src !== imageSrc;
    });

    // Store the updated images in localStorage
    localStorage.setItem("userUploadedImages", JSON.stringify(storedImages));
}

function loadStoredImages() {
    var storedImages = JSON.parse(localStorage.getItem("userUploadedImages")) || [];

    // Create content containers for each stored image
    storedImages.forEach(function (imageInfo) {
        var newContentContainer = document.createElement("div");
        var newImage = document.createElement("img");
        newImage.src = imageInfo.src;
        newImage.alt = "User-uploaded image";

        // Set a fixed width for all images (adjust as needed)
        newImage.style.width = "200px"; 

        var newText = document.createElement("p");
        newText.textContent = imageInfo.description;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            // Remove the content container when the "Remove" button is clicked
            newContentContainer.remove();

            // Remove the image information from localStorage
            removeImageInformation(newImage.src);
        });

        newContentContainer.appendChild(newImage);
        newContentContainer.appendChild(newText);
        newContentContainer.appendChild(removeButton);

        document.getElementById("dynamicContentContainer").appendChild(newContentContainer);
    });
}