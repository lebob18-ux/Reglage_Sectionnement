function calculer(container) {

    let XR = parseFloat(container.querySelector('.XR')?.value);
    let YR = parseFloat(container.querySelector('.YR')?.value);
    let TempReelle = parseFloat(container.querySelector('.TempReelle')?.value);
    let DistAnc = parseFloat(container.querySelector('.DistAnc')?.value);
    let DistRel = parseFloat(container.querySelector('.DistRel')?.value);
    let plage = parseFloat(container.querySelector('input[type="radio"]:checked').value);
    let modeFixe =container.querySelector('.modeFixe')?.checked || false;

    // Validation des entrées
    let donneesValides =
        (!modeFixe &&
            !isNaN(XR) &&
            !isNaN(YR) &&
            !isNaN(DistAnc) &&
            !isNaN(DistRel))
        ||
        (modeFixe &&
            !isNaN(TempReelle) &&
            !isNaN(DistAnc) &&
            !isNaN(DistRel));

    if (!donneesValides) {
        document.querySelector('.resCxPrimeDisplay').textContent = '';
        document.querySelector('.resCxDisplay').textContent = '';
        document.querySelector('.resDDisplay').textContent = '';
        document.querySelector('.resEDisplay').textContent = '';
        document.querySelector('.resB60Display').textContent = '';
        document.querySelector('.resB70Display').textContent = '';
        return;
    }
    const coef_L = 0.000017;
    const coef_f = 0.0017;

    let xmax = 0;
    let L = 0;
    let d = 0;
    let dRel = 0;
    let T_reel = 0;
    let delta = 0;
    let delta_rel = 0;
    let T_moyenne = 2.5 + (plage / 2);
	
    if (!modeFixe) {
        xmax = XR + (YR / 5);
        L = (xmax / 100) / (coef_L * plage);
        d = L - DistAnc;
        dRel = L - DistRel;
        T_reel =(XR / (L * coef_L * 100)) + 2.5;
        delta =(d * coef_f) *(T_moyenne - T_reel);
        delta_rel =(dRel * coef_f) *(T_moyenne - T_reel);

container.querySelector('.longueurDisplay').textContent ="L = " + L.toFixed(0) + " m";
}

 else {
        T_reel = TempReelle;
        d = DistAnc;
        dRel = DistRel;
        delta =(d * coef_f) *(T_moyenne - T_reel);
        delta_rel =(dRel * coef_f) *(T_moyenne - T_reel);
		
		
		
		container.querySelector('.longueurDisplay').textContent ="Ancrage fixe";
		
    }

    let base =(plage === 20 ? 30 : 37.5);

    let valeurBras =
        (plage === 20 ? 14 :
        plage === 35 ? 9 : 3.5) - delta;

    let valCxPrime =
        (base - delta).toFixed(1);

    // Déplacement des bras SVG
    let brasG =document.getElementById('brasGauche');

    let brasD =document.getElementById('brasDroit');

    if (brasG && brasD) {

        let decalage = valeurBras;



        brasG.setAttribute('x1', 109.7 - decalage);
        brasD.setAttribute('x1', 109.7 - decalage+18);
    }
    // SVG
    document.querySelector('.resCxPrimeDisplay').textContent =valCxPrime;
    document.querySelector('.resCxDisplay').textContent =(base + delta).toFixed(1);
    document.querySelector('.resDDisplay').textContent =valeurBras.toFixed(1);
    document.querySelector('.resEDisplay').textContent =(112.5 - delta).toFixed(1);
    document.querySelector('.resB60Display').textContent =(60 - (30 + delta_rel)).toFixed(1);
    document.querySelector('.resB70Display').textContent =(70 - (35 + delta_rel)).toFixed(1);
	
const coteB = document.getElementById("coteB");
coteB.setAttribute("x1", 130-(70- (35 + delta_rel)).toFixed(1));
	
const xAnti = 126 - (70 - (35 + delta_rel));

document.getElementById("antiVrilleur")
        .setAttribute("x", xAnti);	
// cx spire		
const lbob1=lbob-delta
const lbob2=lbob+delta	
    dessinerRessort("ressortG", 288-lbob1, 160, lbob1, 4, 20);
    dessinerRessort("ressortD", 336, 160, lbob2, 4, 20);


const Cx_G = 288-lbob1
const Cx_D = 336+lbob2
	
const AD = document.getElementById("coteA");
AD.setAttribute("x2",Cx_D );

const AG = document.getElementById("coteA'");
AG.setAttribute("x1", Cx_G);		

const axeD = document.getElementById("axe_main_cx_D");
axeD.setAttribute("x1", Cx_D);
axeD.setAttribute("x2", Cx_D);

const axeG = document.getElementById("axe_main_cx_G");
axeG.setAttribute("x1", Cx_G);
axeG.setAttribute("x2", Cx_G);		

//Main_Gauche
document.getElementById("Main_Gauche")
        .setAttribute("x", 285-lbob1);
//Main_Droite
document.getElementById("Main_Droite")
        .setAttribute("x", 334+lbob2);

document.getElementById("Main_Gauche1")
        .setAttribute("x", 281-lbob1);
//Main_Droite
document.getElementById("Main_Droite1")
        .setAttribute("x", 330+lbob2);
	
	
		
//alert("x2");


	
}
function toggleMode(container) {

    let modeFixe = container.querySelector('.modeFixe').checked;

    let blocXY = container.querySelector('.blocXY');
    let tempField = container.querySelector('.tempField');

    if (modeFixe) {
        blocXY.style.display = "none";
        tempField.style.display = "block";
    } else {
        blocXY.style.display = "flex";
        tempField.style.display = "none";
    }
}

function toggleAncrage(cb) {
    const bloc = document.getElementById("blocAncrage");
    if (!bloc) return;bloc.style.display = cb.checked ? "none" : "inline";}

function togglesupport(cb) {
    const support = document.getElementById("blocSupport");
    if (!support) return;support.style.display = cb.checked ? "inline" : "none";}


function dessinerRessort(id, x, y, largeur, nbSpires = 4, amplitude = 15) {
    const trait = largeur * 0.12;          // longueur des traits droits
    const largeurSpire = largeur - (2 * trait);
    const pas = largeurSpire / nbSpires;
    let d = `M${x},${y}`;
    // Trait gauche
    d += ` L${x + trait},${y}`;
    let xc = x + trait;
    // Spires
    for (let i = 0; i < nbSpires; i++) {
        const x0 = xc + i * pas;
        const x1 = x0 + pas;
        d += ` C ${x0 + pas/4},${y + amplitude}
               ${x0 + 3*pas/4},${y + amplitude}
               ${x1},${y}`;
    }
    // Trait droit
    d += ` L${x + largeur},${y}`;
    document.getElementById(id).setAttribute("d", d);
}
const var_cx= 1.5
const lbob= 37.5 * var_cx
window.addEventListener('load', function () {
    dessinerRessort("ressortG", 288-lbob, 160, lbob, 4, 20);
    dessinerRessort("ressortD", 336, 160, lbob, 4, 20);
	
//alert(288-lbob);
	
});


