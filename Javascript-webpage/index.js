const btnUsers = document.getElementById("btnUsers");
const container = document.getElementById("accordion");
const form = document.getElementById("form")

getUsers()

async function getUsers() {
    clear()
    const url = "https://api.github.com/users?per_page=99";
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    result.forEach((result, idx) => {
        // Construct card content
        const content = `
            <div class="col">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <a target="_blank" href="${result.html_url}" ><img src="${result.avatar_url}" class="img-fluid rounded-start" alt="..."></a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${result.login}</h5>
                                <p class="card-text" >Repos:-<a target="_blank" href="${result.repos_url}" >${result.repos_url}</a></p>
                                
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

    // Append newyly created card element to the container
    container.innerHTML += content;
  });
}

form.addEventListener("submit", function(e){
    e.preventDefault()

    var username = document.getElementById("username").value
    username = username.split(' ').join('')
    var sort = document.getElementById("sort").value
    var order = document.getElementById("order").value
    //alert(sort)
    searchUsers(username,sort,order)
})

async function searchUsers(username,sort,order){
    clear()
    //const url = "https://api.github.com/search/users?q="+username+"+in:user&per_page=99"
    const url = "https://api.github.com/search/users?q="+username+"in:user&sort="+sort+"&order="+order+"&per_page=30"
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    result.items.forEach((data, idx) => {
        const content = `
            <div class="col">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <a target="_blank" href="${data.html_url}" ><img src="${data.avatar_url}" class="img-fluid rounded-start" alt="..."></a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.login}</h5>
                                <p class="card-text" >Repos:-<a target="_blank" href="${data.repos_url}" >${data.repos_url}</a></p>
                                
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        // Append newyly created card element to the container
        container.innerHTML += content;
    })
    
}

function clear(){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}
