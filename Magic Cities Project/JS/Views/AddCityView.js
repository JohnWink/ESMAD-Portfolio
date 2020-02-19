import{
    addCity
} from "../Controllers/citiesController.js"

//## adding the information from the submition form to the localStorage whit the clikc of the button
document.querySelector("#frmAddCity").addEventListener("submit", function (event) {
    // Invocação a função importada do fx main.js chamada addBand
    
    addCity(
        document.querySelector("#txtName").value,
        document.querySelector("#txtLevel").value,
        document.querySelector("#sltZone").value,
        document.querySelector("#txtDate").value,
        document.querySelector("#txtCover").value,
        document.querySelector("#txtBrasao").value,
        document.querySelector("#txtMap").value,
        document.querySelector("#txtLink").value,
        document.querySelector("#txtDescription").value,
        document.querySelector("#txtImg1").value,
        document.querySelector("#txtImg2").value,
        document.querySelector("#txtImg3").value

        )
    // Prevent the submition of the form
    /*,
        */

    event.preventDefault()
})
