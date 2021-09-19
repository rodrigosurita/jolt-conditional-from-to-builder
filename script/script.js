function conversorDePaisHCMSOC() {

    var hcm =
        'BR;PT;AR';
    var soc =
        '105;607;63';

    hcm = hcm.split(';');
    soc = soc.split(';');

    var deParaJolt = ``;

    hcm.forEach(function (codigoHCM, i) {
        deParaJolt += `"${codigoHCM}": {"#${soc[i]}": "dadosSOC.funcionarioWsVo.codigoPaisNascimento"},`
    });

    return (deParaJolt)

}

$(document).ready(function () {
    var tagInputEle = $('#tags-input');
    tagInputEle.tagsinput();
    tagInputEle.tagsinput('add', 'Jakarta');
    tagInputEle.tagsinput('add', 'Bogor');
    tagInputEle.tagsinput('add', 'Bandung');
});