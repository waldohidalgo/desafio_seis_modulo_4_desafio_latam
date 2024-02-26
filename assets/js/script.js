const loaderObjeto = document.querySelector(".contenedor_loader");
const contenedorAcordion = document.querySelector(".contenedor_acordion");
const getPostsButton = document.querySelector(".get_posts");
const postDataContenedor = document.getElementById("post-data");

getPostsButton.addEventListener("click", function () {
  postDataContenedor.style.display = "block";
  consultaPostsAPI();
});

async function consultaPostsAPI() {
  const urlPostsAPI = "https://jsonplaceholder.typicode.com/posts";
  try {
    const responseObject = await fetch(urlPostsAPI);

    if (responseObject.status == 200) {
      const data = await responseObject.json();
      mostrarData(data);
      mostrarAcordion();
      getPostsButton.disabled = true;
    }
    if (responseObject.status == 404) {
      console.log("Ha ocurrido un error 404");
      alert("Ha ocurrido un error 404");
    }
  } catch (error) {
    console.log("Error en el fetch");
    alert("Error en el fetch");
  }
}
function mostrarAcordion() {
  loaderObjeto.style.display = "none";
  contenedorAcordion.style.display = "block";
}

function mostrarData(data) {
  const acordionPosts = document.getElementById("acordionPosts");
  acordionPosts.innerHTML = "";

  const idUsersArray = [...new Set(data.map((obj) => obj.userId))];
  for (let i = Math.min(...idUsersArray); i <= idUsersArray.length; i++) {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");
    accordionItem.innerHTML = `
    <h2 class="accordion-header" id="heading${i}">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${i}"
      aria-expanded="false"
      aria-controls="collapse${i}"
    >
      ID de Usuario: ${i}
    </button>
  </h2>
  <div
    id="collapse${i}"
    class="accordion-collapse collapse"
    aria-labelledby="heading${i}"
    data-bs-parent="#acordionPosts"
  >
    <div class="accordion-body">
     ${accordionItemBody(data.filter((obj) => obj.userId == i))}
    </div>
  </div>
    `;
    acordionPosts.appendChild(accordionItem);
  }
}

function accordionItemBody(dataBody) {
  let lista = "<ul>";
  for (obj of dataBody) {
    lista += `<li>
    <h2>ID Post:${obj.id} <br> Titulo:${obj.title}</h2>
    <p>${obj.body}</p>
    </li>`;
  }
  lista += "</ul>";
  return lista;
}

/*
<div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#acordionPosts"
            >
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>

*/
