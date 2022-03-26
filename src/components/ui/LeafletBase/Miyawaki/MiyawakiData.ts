import { TMiyawakiData } from "./Miyawaki"

const mockdata: TMiyawakiData[] = [
    {
        id: '1',
        name: 'Miyawaki Skov Ejby 宮脇 森林',
        status: 'forest',
        municipality: 'Middelfart',
        LatLng: [55.425556, 9.936111],
        info: [
            {
                type: 'text', description: 'beskrivelse',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
    {
        id: '2',
        name: 'Miyawaki Skov Jelling',
        status: 'forest',
        municipality: 'Vejle',
        LatLng: [55.748611, 9.424444],
        info: [
            {
                type: 'text',
                description: 'Jelling Miyawaki-skov',
                content: "Miyawaki-skove er små, intensive mangeartsskove, som binder uproportionalt meget CO2, selvom de kan fylde så lidt som 50-100 m2 og derfor også er velegnede i byer og tætbefolkede områder. Der arbejdes i første omgang for etablering af 300 m2 skov på Vejle Spildevands  græsareal på Skinbjerg 68 i Jelling (det tidligere rensningsanlæg). Skovarealet kan skaleres op, hvis der sikres yderligere lokal medfinansiering. Skovkonceptet er udviklet af den japanske botaniker Akira Miyawaki, som har medvirket ved etablering af mere end 1.000 sådanne skove i Japan, Malaysia og andre steder.Kernen i konceptet er, at der ved indkøb af en variation(+ 30 arter) af hjemmehørende planter, som udplantes meget tæt(3 planter pr.m2) på et forberedt jordstykke, kan skabes et livskraftigt økosystem, der vokser 10 gange hurtigere og bliver 30 gange tættere og 100 gange mere biodiverst end konventionelle skovplantager.Metoden simulerer naturlige skovsystemer, men medfører en langt hurtigere vækst.Forskere har tidligere beskrevet, at naturlige skove er en nøgle til at nå klimamålene, da de kan lagre 40 gange mere CO2 end traditionelle plantager.Miyawaki - skove er i dette lys en hurtigere vej til kraftigere CO2 - reduktion end alternativerne.Minimumsstørrelsen gør Miyawaki - skove attraktive i byområder, hvor de kan fungere som rekreative åndehuller for byens borgere og tjene som 'vilde lommer' eller korridorer for dyrelivet."
            },
            { type: 'img', description: 'Miyawaki Skove Danmark', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'img', description: '', content: `https://www.vmcdn.ca/f/files/richmondnews/images/columns/miyawaki-model.jpg;w=960` },
            { type: 'img', description: 'No machine-readable author provided. おぉたむすねィく探検隊 assumed (based on copyright claims)., CC BY-SA 2.5 <https://creativecommons.org/licenses/by-sa/2.5>, via Wikimedia Commons', content: `https://upload.wikimedia.org/wikipedia/commons/5/58/Sasayama1.JPG` },
            { type: 'img', description: '愛種樹公司攜手高雄阿蓮區居民，種下國內首座「宮脇森林」。記者王昭月／攝影', content: `https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/03/12/realtime/11867505.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930&nt=1` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: [
            {
                name: "area",
                value: '300m²',
            }
        ]
    },
    {
        id: '3',
        name: 'Miyawaki Skov Randers',
        status: 'prospect',
        municipality: 'Randers',
        LatLng: [56.463948, 10.030335],
        info: [
            {
                type: 'text', description: 'Hvad er en Miyawaki-skov?',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
    {
        id: '4',
        name: 'Miyawaki Skov Frederikssund',
        status: 'prospect',
        municipality: 'Fredrikssund',
        LatLng: [55.836091, 12.060602],
        info: [
            {
                type: 'text', description: 'Hvad er en Miyawaki-skov?',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
    {
        id: '5',
        name: 'Miyawaki Skov Veksø',
        status: 'prospect',
        municipality: 'Egedal',
        LatLng: [55.753269, 12.239143],
        info: [
            {
                type: 'text', description: 'Hvad er en Miyawaki-skov?',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
    {
        id: '6',
        name: 'Miyawaki Skov København',
        status: 'prospect',
        municipality: 'København',
        LatLng: [55.686776, 12.572714],
        info: [
            {
                type: 'text', description: 'Hvad er en Miyawaki- skov ?',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },

            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
    {
        id: '7',
        name: 'Miyawaki Skov Rødovre',
        status: 'project',
        municipality: 'Rødovre',
        LatLng: [55.687462, 12.449536],
        info: [
            {
                type: 'text', description: 'Hvad er en Miyawaki-skov?',
                content: "Har du hørt om Miyawaki skove, de kaldes også Tiny forest eller lommeskove. De er oftest små og plantes i byer og bruges til undervisning. Vokser hurtigere, gemmer mere CO2, mere biodiversitet og mere tæt. Det startede i Japan for over 40 år siden, kom herefter til Indien og senere til Holland for ca. 5 år siden.I Holland er der plantet + 110 skove, men også i Frankrig og Belgien. I England er der 12 skove på vej.Se mere i denne 3 minutters BBC video. I Danmark plantes der nogle af disse skove i løbet af efteråret bl.a.i Jelling og Middelfart.Følg med på Miyawaki Skove Danmark.Derudover er der folk i flere byer som gerne vil igang og som søger flere frivillige, Randers, Frederikssund, Veksø, København, Rødovre m.fl."
            },
            { type: 'img', description: 'Billede', content: `${process.env.PUBLIC_URL}/logo/miyawaki_icon.png` },
            { type: 'link', description: 'omstilling.nu', content: 'https://omstilling.nu' },
        ],
        data: []
    },
]

export default mockdata 