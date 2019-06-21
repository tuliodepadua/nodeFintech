module.exports = {
    CPF(r_vlr) {
        if (r_vlr != "" ) {
            let cpf = r_vlr.replace(/[^0-9]/g, "");
            if (
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999" || 
                cpf.length < 11
            ) {
                return 1;
            }
            if (cpf.length == 11) {
                let v = [];
                v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
                v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
                v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
                v[0] = v[0] % 11;
                v[0] = v[0] % 10;

                v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
                v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
                v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
                v[1] = v[1] % 11;
                v[1] = v[1] % 10;

                if (v[0] != cpf[9] || v[1] != cpf[10]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        } else {
            return 1;
        }
    },
    email(r_vlr) {
        let emailFilter = /^.+@.+\..{2,}$/;
        let illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
        if (!emailFilter.test(r_vlr) || r_vlr.match(illegalChars)) {
            return 1;
        } else {
            return 0;
        }
    },
    MontCPF(vlr = String ){
        let numero = '';
        vlr.length > 3 ? numero =  `${vlr.substr(0, 3)}.` : numero = vlr;
        vlr.length > 6 ? numero += `${vlr.substr(3, 3)}.` : numero += `${vlr.substr(3, 3)}`;
        vlr.length > 9 ? numero += `${vlr.substr(6, 3)}-${vlr.substr(9, 2)}` : numero += `${vlr.substr(6, 3)}`;
        return numero;
    }
}