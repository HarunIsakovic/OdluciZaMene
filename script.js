const unosOpcije = document.getElementById("unosOpcije");
const dugmeDodaj = document.getElementById("dugmeDodaj");

const listaOpcija = document.getElementById("listaOpcija");
const listaTezina = document.getElementById("listaTezina");

const brojOpcija = document.getElementById("brojOpcija");
const ukupnaTezina = document.getElementById("ukupnaTezina");
 
const dugmeOdluci = document.getElementById("dugmeOdluci");
const dugmeResetuj = document.getElementById("dugmeResetuj");

const rezultat = document.getElementById("rezultat");
const tekstRezultata = document.getElementById("tekstRezultata");

const dugmePonovo = document.getElementById("dugmePonovo");

let opcije = []; 

function dodajOpciju() {

    const naziv = unosOpcije.value.trim();

    if (naziv === "") {
        unosOpcije.focus(); 
        return;
    }

    if (opcije.length >= 10) {
        alert("Možeš dodati maksimalno 10 opcija.");
        return;
    }

    const novaOpcija = {
        id: Date.now(), 
        naziv: naziv, 
        tezina: 50
    };

    opcije.push(novaOpcija);

    unosOpcije.value = "";

    prikaziSve();

    unosOpcije.focus();
}

function obrisiOpciju(id) {

    opcije = opcije.filter(
        opcija => opcija.id !== id
    );

    prikaziSve();
}

function prikaziSve() {

    prikaziOpcije(); 
    prikaziTezine(); 
    azurirajBrojOpcija(); 
    azurirajUkupnuTezinu();
}

function prikaziOpcije() {

    listaOpcija.innerHTML = "";

    if (opcije.length === 0) {

        const poruka = document.createElement("p");

        poruka.textContent =
            "Još nemaš dodanih opcija.";

        poruka.style.color = "#64748b";
        poruka.style.fontSize = "14px";

        listaOpcija.appendChild(poruka);

        return;
    }

    opcije.forEach(opcija => {

        const stavka = document.createElement("div");

        stavka.className = "stavka-opcije";

        const naziv = document.createElement("span");

        naziv.className = "naziv-opcije";

        naziv.textContent = opcija.naziv;

        const dugmeObrisi =
            document.createElement("button");

        dugmeObrisi.className =
            "dugme-obrisi";

        dugmeObrisi.textContent = "×";

        dugmeObrisi.title = "Obriši opciju";

        dugmeObrisi.addEventListener(
            "click",
            () => obrisiOpciju(opcija.id)
        );

        stavka.appendChild(naziv);

        stavka.appendChild(dugmeObrisi);

        listaOpcija.appendChild(stavka);
    });
}

function prikaziTezine() {

    listaTezina.innerHTML = "";

    if (opcije.length === 0) {

        listaTezina.innerHTML = `
            <p style="color:#64748b;font-size:14px;">
                Dodaj opcije da bi podesio njihove šanse.
            </p>
        `;

        return;
    }

    opcije.forEach(opcija => {

        const stavka =
            document.createElement("div");

        stavka.className =
            "stavka-tezine";

        const naziv =
            document.createElement("span");

        naziv.className =
            "naziv-tezine";

        naziv.textContent =
            opcija.naziv;

        const klizac =
            document.createElement("input");

        klizac.type = "range";

        klizac.className =
            "klizac-tezine";

        klizac.min = "1";

        klizac.max = "100";

        klizac.value =
            opcija.tezina;

        const vrijednost =
            document.createElement("span");

        vrijednost.className =
            "vrijednost-tezine";

        vrijednost.textContent =
            opcija.tezina + "%";

        klizac.addEventListener(
            "input",
            () => {

                opcija.tezina =
                    Number(klizac.value);

                vrijednost.textContent =
                    opcija.tezina + "%";

                azurirajUkupnuTezinu();
            }
        );

        stavka.appendChild(naziv);

        stavka.appendChild(klizac);

        stavka.appendChild(vrijednost);

        listaTezina.appendChild(stavka);
    });
}

function azurirajBrojOpcija() {

    brojOpcija.textContent =
        opcije.length;
}

function azurirajUkupnuTezinu() {

    const ukupno = opcije.reduce(
        (zbir, opcija) =>
            zbir + opcija.tezina,
        0
    );

    ukupnaTezina.textContent =
        ukupno + "%";

    if (ukupno === 100) {

        ukupnaTezina.style.color =
            "#22c55e";

    } else {

        ukupnaTezina.style.color =
            "#f59e0b";
    }
}

function nasumicniIzborSaTezinom() {

    const ukupno = opcije.reduce(
        (zbir, opcija) =>
            zbir + opcija.tezina,
        0
    );

    let nasumicniBroj =
        Math.random() * ukupno;

    for (const opcija of opcije) {

        nasumicniBroj -=
            opcija.tezina;

        if (nasumicniBroj <= 0) {
            return opcija;
        }
    }

    return opcije[opcije.length - 1];
}

function odluci() {

    if (opcije.length < 2) {

        alert(
            "Dodaj najmanje dvije opcije."
        );

        return;
    }

    dugmeOdluci.disabled = true;

    let protekloVrijeme = 0;

    const trajanjeAnimacije = 1800;

    const animacija =
        setInterval(() => {

            const nasumicniIndex =
                Math.floor(
                    Math.random() * opcije.length
                );

            tekstRezultata.textContent =
                opcije[nasumicniIndex].naziv;

            rezultat.classList.remove(
                "skriven"
            );

            protekloVrijeme += 100;

            if (
                protekloVrijeme >=
                trajanjeAnimacije
            ) {

                clearInterval(animacija);

                zavrsiOdluku();
            }

        }, 100);

    rezultat.classList.remove("skriven");

    rezultat.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function zavrsiOdluku() {

    const pobjednik =
        nasumicniIzborSaTezinom();

    tekstRezultata.textContent =
        pobjednik.naziv;

    rezultat.classList.remove(
        "rezultat"
    );

    void rezultat.offsetWidth;

    rezultat.classList.add(
        "rezultat"
    );

    dugmeOdluci.disabled = false;
}

function resetujAplikaciju() {

    opcije = [];

    rezultat.classList.add(
        "skriven"
    );

    unosOpcije.value = "";

    dugmeOdluci.disabled = false;

    prikaziSve();
}

function odluciPonovo() {

    rezultat.classList.add(
        "skriven" 
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });

    setTimeout(() => {

        odluci(); 

    }, 300);
}

dugmeDodaj.addEventListener(
    "click",
    dodajOpciju
);

unosOpcije.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            dodajOpciju();
        }
    }
);

dugmeOdluci.addEventListener(
    "click",
    odluci
);

dugmeResetuj.addEventListener(
    "click",
    resetujAplikaciju
);

dugmePonovo.addEventListener(
    "click",
    odluciPonovo
);

prikaziSve();
