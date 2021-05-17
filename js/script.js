//Test Quantité non vide
function emptyQte() {
    if (document.getElementById('qte').value === "") {
        document.getElementById('ajout').disabled = true;
    } else {
        document.getElementById('ajout').disabled = false;
    }

}

var delRowList = function (btn2) {
    /*
    var i = btn2.parentNode.parentNode.rowIndex;
    document.getElementById("sellTable").deleteRow(i);
    */
    var delbtn = document.getElementById('sellTable');
    delbtn.deleteRow(btn2.parentNode.rowIndex);
    var arr = document.getElementsByClassName('subTotal');
    console.log(arr.length);

//Re-Calcul somme aprés chaque suppression
    var tot = 0;
    for (var i = 0; i < arr.length; i++) {
        console.log(tot);
        tot += parseFloat(arr[i].textContent);
    }
    console.log(tot);

    document.getElementById('totalprod').innerHTML = tot.toFixed(3) + " DT";

}


var setupListeners = function () {
    var btn = document.getElementById('ajout');
    btn.addEventListener('click', addShopList);
}

window.addEventListener('load', setupListeners);


var addShopList = function () {
    //Making Table
    var product = document.getElementById("shopList").options[document.getElementById('shopList').selectedIndex].text; 
    var quantity = document.getElementById("qte").value; 
    var sum = document.getElementById("shopList").value; 
    var total = parseInt(quantity) * parseFloat(sum);

    //Creation Tableau : Une ligne Dynamique
    var tbody = document.querySelector('#sellTable tbody');
    var trproduct = document.createElement('TR');
    tbody.appendChild(trproduct);
    var tbodytr = tbody.lastChild;

    //Allocation 1ére Element "TD"
    var prdctNameSpace = document.createElement('TD');
    tbodytr.appendChild(prdctNameSpace);
    
    //Insertion des valeur

    //Etape 1 : Recevoir Nom /Value -> Insertion dans le tableau
    var prdctName = document.createTextNode(product);
    prdctNameSpace.appendChild(prdctName);

    var productQteSpace = document.createElement("TD");
    tbodytr.appendChild(productQteSpace);

    var productQte = document.createTextNode(quantity);
    productQteSpace.appendChild(productQte);
    

    var productSinglePriceSpace = document.createElement("TD");
    tbodytr.appendChild(productSinglePriceSpace);
    
    var productSinglePrice = document.createTextNode(parseInt(sum).toFixed(3));
    productSinglePriceSpace.appendChild(productSinglePrice);
    
    var productTotalPriceSpace = document.createElement("TD");
    tbodytr.appendChild(productTotalPriceSpace);
    
    var productTotalPrice = document.createTextNode(parseFloat(total).toFixed(3));
    productTotalPriceSpace.appendChild(productTotalPrice);
    productTotalPriceSpace.className = 'subTotal'; //Ajouter une classe à une case dynamique.

    var productDeleteSpace = document.createElement("TD");
    var productDeletebtn = document.createElement("BUTTON");
    
    productDeletebtn.setAttribute('class', 'btn x'); //Classe a un button dynamique
    productDeletebtn.name = 'delrow'; //Nom a un button dynamique
    productDeletebtn.textContent = "X"; //Value a un button dynamique
    
    tbodytr.appendChild(productDeletebtn);

    productDeletebtn.setAttribute('onclick', 'delRowList(this)'); //Action du button


// Calcul Total des articles  
    var arr = document.getElementsByClassName('subTotal');
    console.log(arr.length);
    var tot = 0;
    for (var i = 0; i < arr.length; i++) {
        console.log(tot);
        tot += Number(arr[i].textContent);

    }
    console.log(tot);

    document.getElementById('totalprod').innerHTML = tot.toFixed(3) + " DT";;



}


//Fonction Incrementation Indice Du Panier
var addtoCartNumber = function () {
    var count = document.getElementById('cartCount').textContent;
    parseInt(count);
    count = +count + 1;
    document.getElementById('cartCount').innerHTML = count;
}



//Page Panier.html 2éme Méthode du Panier jQuery.

document.addEventListener("DOMContentLoaded", function(event) 
{ 
    total_Somme();
    $('.qty, .price').on('keyup keypress blur change', function(e) {
        total_Somme();
    });
});

function total_Somme(){
    var sum = 0;
    $('#myTable > tbody  > tr').each(function() {
        var qty = $(this).find('.qty').val();
        var price = $(this).find('.price').val();
        var amount = (qty*price)
        sum+=amount;
        $(this).find('.amount').text(''+amount);
    });
    $('.total').text(sum);
}

