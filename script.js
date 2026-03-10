fetch('https://equran.id/api/surat')
    .then(response => response.json())
    .then(data => {
        const surah = data

        let list = ''
        surah.forEach(m => list += showSurah(m));
        const suratContainer = document.querySelector('.container-surat');
        suratContainer.innerHTML = list;


        const detailSurat = document.querySelectorAll('.buka-surat');
        detailSurat.forEach(btn => {
            btn.addEventListener('click', function () {
                const nomorSurat = this.dataset.suratid;
                fetch('https://equran.id/api/surat/' + nomorSurat)
                    .then(response => response.json())
                    .then(m => {
                        const surah = m.ayat;
                        const a = (surah.map(a => `
                        <ul class="list-group">
                          <h5 class="mb-1"> 
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span class="badge badge-primary badge-pill">${a.nomor}</span>
                                ${a.ar}
                                </li>
                             </ul>
                          </h5>
                          <small class="mx-3">${a.idn}</small>
                        
                    </ul>
                      
                        `).join(''));
                        // const b = (surah.map(a => a.nomor));
                        console.log(a)
                        // for (let apa of a) {
                        // }
                        const movieDetail = ShowSuratDetail(a);
                        const modalBody = document.querySelector('.surat-body');
                        modalBody.innerHTML = a;
                    })
            })
        })
    });



function showSurah(m) {
    return `                      
                <div class="list-group my-1">
                <a href="#" class="list-group-item list-group-item-action buka-surat" data-toggle="modal"
                    data-target="#suratDetail" data-suratid="${m.nomor}">
                    <div class="row">
                        <div class="col-sm-1"><span class="badge badge-primary text-wrap"
                                style="padding: 1.2rem;">${m.nomor}</span>
                        </div>
                        <div class="col-sm">
                            <h5 class="mb-1">${m.nama_latin} - ${m.nama}</h5>
                            <h5 class="mb-1"></h5>
                            <p class="mb-1">${m.arti}</p>
                        </div>
                       
                    </div>
                </a>
            </div>`;
}

function cetak(ayat) {
    return `
    <h5 class="mb-1">
        ${ayat.map(mhs => mhs.join(''))}
    </h5>
    `;
}
// console.log(cetak(ayat))
function ShowSuratDetail(a) {
    return `     <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" >
                        <div class="d-flex w-100 justify-content-between">
                            <p class="mb-1"></p>
                        </div>
                       <h5 class="mb-1">${a}</h5>

                    </a>
                </div>`;
}