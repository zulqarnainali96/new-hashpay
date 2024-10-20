import { wordlist } from "./english_wordlist";

function generateMenmonic(length) {
    var mnemonic = [];
    for(var i=0; i < length; i++){
        const randomWords = wordlist.english[Math.floor(Math.random()*wordlist.english.length)];
        mnemonic.push(randomWords)
    }
    return mnemonic.join(" ")
}

export const mnemonic = {
    generateMenmonic
}