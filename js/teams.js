/* ==========================================================
   CS LOGOS — dados de todos os times.
   Para adicionar um time: copie um bloco { ... }, troque os
   dados e coloque as imagens em assets/ (WebP, até 640 px).

   Campos de cada logo:
     years    texto exibido na linha do tempo ("2009–2021", "2021–atual")
     src      caminho da imagem (sem src → "Logo em breve")
     w, h     tamanho real da imagem em pixels
     alt      opcional; padrão "Logo da <time> (<years>)"
     caption  descrição neutra/informativa
     opinion  opcional; comentário pessoal ("Opinião do autor")
     invert   opcional; true = renderiza a logo em branco
   As logos ficam em ordem cronológica (a última é a atual).
   ========================================================== */
window.TEAMS = [
  {
    slug: 'navi',
    name: 'NAVI',
    fullName: 'Natus Vincere',
    aliases: ['natus vincere', "na'vi"],
    founded: 2009,
    country: 'Ucrânia',
    region: 'Leste Europeu',
    colors: [
      { name: 'Amarelo', hex: '#FAE800' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Fundada em dezembro de 2009 em Kiev, a NAVI — do latim Natus Vincere, “nascido para vencer” — estreou dominando o CS 1.6: em 2010 venceu a IEM, a ESWC e a WCG, tornando-se a primeira equipe a conquistar os três grandes torneios do jogo num mesmo ano. No CS:GO, liderada por s1mple, venceu o PGL Major Estocolmo 2021 sem perder um único mapa e voltou a ser campeã mundial no PGL Major Copenhague 2024.',
    logoDesign: 'O emblema é um paralelogramo amarelo inclinado, com as letras N-A-V-I recortadas em preto, sugerindo velocidade e ataque. Por mais de uma década a logo trouxe o nome “Natus Vincere” escrito por baixo; no rebranding de junho de 2021, lançado junto com o novo uniforme, o texto saiu e o símbolo ficou mais limpo e geométrico.',
    logos: [
      { years: '2009–2021', src: 'assets/navi-2009.webp', w: 640, h: 570,
        caption: 'O emblema clássico: as letras NAVI em preto sobre o paralelogramo amarelo, com “Natus Vincere” escrito embaixo. Acompanhou o título triplo de 2010 e toda a era s1mple até 2021.' },
      { years: '2021–atual', src: 'assets/navi-2021.webp', w: 600, h: 527,
        caption: 'Versão apresentada em junho de 2021: o nome por extenso foi removido e o contorno amarelo ganhou destaque. É a logo dos títulos de Major de 2021 e 2024.' }
    ]
  },
  {
    slug: 'astralis',
    name: 'Astralis',
    fullName: 'Astralis',
    aliases: [],
    founded: 2016,
    country: 'Dinamarca',
    region: 'Europa',
    colors: [
      { name: 'Vermelho', hex: '#E00000' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em janeiro de 2016 pelos próprios jogadores do antigo elenco dinamarquês da TSM, a Astralis tornou-se uma das organizações mais vitoriosas da história do Counter-Strike. Na inesquecível “Era Astralis”, a equipe conquistou quatro Majors — Atlanta 2017, Londres 2018, Katowice 2019 e Berlim 2019, os três últimos em sequência — e revolucionou o jogo com o uso tático de granadas e um trabalho em equipe metódico.',
    logoDesign: 'A estrela vermelha de cinco pontas, com uma estrela menor vazada no centro e uma das pontas alongada para cima, representa precisão e foco. O desenho segue a estética escandinava moderna — poucas formas, cor sólida — e se destaca muito bem nos stickers aplicados nas armas dentro do jogo.',
    logos: [
      { years: '2016–atual', src: 'assets/astralis-2016.webp', w: 406, h: 492,
        caption: 'A primeira e única logo da Astralis. O formato nunca mudou desde a fundação; apenas o tom de vermelho é ajustado de tempos em tempos.' }
    ]
  },
  {
    slug: 'faze',
    name: 'FaZe',
    fullName: 'FaZe Clan',
    aliases: ['faze clan'],
    founded: 2010,
    country: 'Estados Unidos',
    region: 'América do Norte',
    colors: [
      { name: 'Vermelho', hex: '#E43A2C' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Criada em 30 de maio de 2010 como o canal “FaZe Sniping”, dedicado a vídeos de trickshots de Call of Duty no YouTube, a FaZe Clan se transformou em uma das maiores organizações de esports e entretenimento do mundo. Sua entrada no Counter-Strike aconteceu em janeiro de 2016, ao assumir o elenco internacional da G2 Esports. Em 2022, a equipe conquistou o PGL Major Antuérpia, tornando-se a primeira formação totalmente internacional a vencer um Major.',
    logoDesign: 'O símbolo combina as letras “F” e “C” sobrepostas — a segunda espelhada — formando um escudo pontiagudo com as iniciais da organização. Com o tempo ganhou um contorno preto e um vermelho mais quente, mas o formato é o mesmo desde os tempos de Call of Duty.',
    logos: [
      { years: '2010–2016', src: 'assets/faze-2010.webp', w: 640, h: 329,
        caption: 'O monograma original da FaZe Clan, em vermelho sólido e sem contorno, criado ainda na época dos vídeos de Call of Duty.' },
      { years: '2016–atual', src: 'assets/faze-2016.webp', w: 640, h: 425,
        caption: 'A versão usada no cenário de CS:GO e CS2: o mesmo formato icônico, agora com contorno preto e um vermelho alaranjado.' }
    ]
  },
  {
    slug: 'fnatic',
    name: 'Fnatic',
    fullName: 'Fnatic',
    aliases: ['fnc'],
    founded: 2004,
    country: 'Reino Unido',
    region: 'Europa',
    colors: [
      { name: 'Laranja', hex: '#FF5900' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em 2004 por Sam e Anne Mathews, a Fnatic é uma das organizações mais influentes dos esports. No Counter-Strike, foi a primeira equipe tricampeã de Majors na era CS:GO — DreamHack Winter 2013, ESL One Katowice 2015 e ESL One Colônia 2015 —, com lendários elencos suecos repletos de astros como olofmeister, flusha, JW e KRIMZ.',
    logoDesign: 'O símbolo laranja da Fnatic sugere as letras do nome em uma única forma, com hastes que lembram braços erguidos em comemoração. A versão original era cheia de curvas e trazia o nome “FNATIC” por baixo; em 2020 o desenho ficou geométrico, de linhas retas, e o nome saiu do emblema.',
    logos: [
      { years: '2004–2015', src: 'assets/fnatic-2004.webp', w: 640, h: 630,
        caption: 'A primeira logo da Fnatic: o símbolo laranja cheio de curvas, com o nome em letras quadradas por baixo.',
        opinion: 'A minha preferida.' },
      { years: '2015–2020', src: 'assets/fnatic-2015.webp', w: 610, h: 640,
        caption: 'Uma pequena simplificação: o símbolo ficou mais encorpado e a tipografia do nome foi redesenhada, na época dos títulos de Katowice e Colônia.' },
      { years: '2020–atual', src: 'assets/fnatic-2020.webp', w: 640, h: 417,
        caption: 'O rebranding de 2020 trocou as curvas por um monograma de linhas retas e cortes diagonais, sem o nome por baixo.',
        opinion: 'Uma bosta.' }
    ]
  },
  {
    slug: 'nip',
    name: 'NIP',
    fullName: 'Ninjas in Pyjamas',
    aliases: ['ninjas in pyjamas', 'nip'],
    founded: 2000,
    country: 'Suécia',
    region: 'Europa',
    colors: [
      { name: 'Amarelo neon', hex: '#D8F800' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Dourado clássico', hex: '#A88860' }
    ],
    history: 'Fundada em junho de 2000 por Tommy “Potti” Ingemarsson e Christoffer “Tootzi” Olsson, a Ninjas in Pyjamas é uma das organizações mais antigas do Counter-Strike. Após períodos de inatividade, a NiP voltou em 2012 com um elenco lendário para a estreia do CS:GO, protagonizando uma sequência recorde de 87 mapas vencidos seguidos em LAN e conquistando o Major de Colônia em 2014. A organização sueca segue ativa até hoje, também em títulos como Rainbow Six Siege e Valorant.',
    logoDesign: 'Desde a era CS:GO, a identidade da NiP gira em torno do shuriken, a estrela de arremesso dos ninjas, em referência direta ao nome. Por anos o time usou preto, branco e dourado, até o grande rebranding de 2021, que trouxe o amarelo neon e redesenhou o shuriken com o caractere japonês “nin” no centro, numa estética urbana inspirada em Tóquio.',
    logos: [
      { years: '2000–2006', src: 'assets/nip-2000.webp', w: 360, h: 245,
        caption: 'A primeira logo da NiP: as letras N, I e P em traços pesados e irregulares, com o visual caseiro típico dos clãs do início dos anos 2000.',
        opinion: 'Estranha.' },
      { years: '2006–2012', src: 'assets/nip-2006.webp', w: 498, h: 585,
        caption: 'Um losango azul atravessado por uma seta dupla, que forma o “I” entre o N e o P.',
        opinion: 'Feita no paint em alguns minutos.' },
      { years: '2012–2021', src: 'assets/nip-2012.webp', w: 640, h: 640,
        caption: 'O icônico shuriken dourado que acompanhou a NiP durante a era de ouro do CS:GO, incluindo a sequência de 87 mapas e o Major de Colônia 2014.' },
      { years: '2021–atual', src: 'assets/nip-2021.webp', w: 640, h: 640,
        caption: 'A versão modernizada do shuriken, incorporando o caractere japonês “nin” e a nova paleta em amarelo neon.' }
    ]
  },
  {
    slug: 'mouz',
    name: 'MOUZ',
    fullName: 'MOUZ',
    aliases: ['mousesports'],
    founded: 2002,
    country: 'Alemanha',
    region: 'Europa',
    colors: [
      { name: 'Vermelho', hex: '#F00000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em 2002, a mousesports é uma das organizações mais antigas do Counter-Strike e foi uma das fundadoras da associação G7 Teams. Ao longo de quase duas décadas, acumulou centenas de títulos com a mesma identidade visual, até a reformulação completa de outubro de 2021, quando adotou o nome curto MOUZ. Sediada em Hamburgo, a organização mantém presença forte no CS2 e em outros títulos.',
    logoDesign: 'O antigo emblema da mousesports remetia à cabeça de um mouse (o animal) e, ao mesmo tempo, a uma mão sobre o mouse do computador — um duplo sentido que poucos fãs percebiam. Na reformulação de 2021 surgiu um distintivo em formato de coração, que combina o rosto do mouse com a letra “M” e simboliza a paixão de jogadores e torcida. O vermelho, presente desde 2002, continuou no centro da identidade.',
    logos: [
      { years: '2002–2021', src: 'assets/mouz-2002.webp', w: 365, h: 200,
        caption: 'A logo original da mousesports, usada por quase 20 anos.' },
      { years: '2021–atual', src: 'assets/mouz-2021.webp', w: 427, h: 450,
        caption: 'O distintivo em forma de coração, unindo o rosto de um mouse à letra “M”, que marcou a transição de mousesports para MOUZ.' }
    ]
  },
  {
    slug: 'sk',
    name: 'SK Gaming',
    fullName: 'SK Gaming',
    aliases: ['schroet kommando', 'sk'],
    founded: 1997,
    country: 'Alemanha',
    region: 'Europa',
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Criada em 1997 como o clã de Quake Schroet Kommando, em Oberhausen, a SK Gaming é uma das marcas mais antigas e prestigiadas dos esports. No Counter-Strike, dominou a era do 1.6 com elencos suecos lendários e voltou ao topo no CS:GO ao contratar o quinteto brasileiro liderado por FalleN, que conquistou o Major ESL One Colônia 2016 e dominou o cenário entre 2016 e 2017.',
    logoDesign: 'O monograma une as letras “S” e “K” em uma única forma de traços grossos e cantos arredondados, em que o fim de uma letra vira o começo da outra. Em 2022, no aniversário de 25 anos, a marca foi refinada e integrada a um novo sistema visual, sem perder o símbolo que estampou alguns dos stickers mais cobiçados do jogo.',
    logos: [
      { years: '2003–atual', src: 'assets/sk-atual.webp', w: 446, h: 446, invert: false,
        caption: 'O monograma “SK”, símbolo da organização nas eras do CS 1.6 e do CS:GO.' }
    ]
  },
  {
    slug: 'mibr',
    name: 'MIBR',
    fullName: 'MIBR',
    aliases: ['made in brazil'],
    founded: 2003,
    country: 'Brasil',
    region: 'Brasil',
    colors: [
      { name: 'Verde', hex: '#00A030' },
      { name: 'Amarelo', hex: '#F8D800' },
      { name: 'Azul', hex: '#003058' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Fundada em 2003, a MIBR (Made in Brazil) é a organização brasileira mais tradicional do Counter-Strike, criada quando o empresário Paulo Velloso decidiu investir no sonho competitivo do próprio filho. Campeã mundial da CPL Winter 2006, a marca foi desativada em 2012, mas ressurgiu em 2018 depois de ser adquirida pela Immortals, que montou o elenco com FalleN, fer, coldzera e companhia, vindos do título mundial de 2016 pela SK Gaming. Em outubro de 2025, a organização foi comprada pela empresa brasileira Spun Mídia, voltando a ter controle 100% nacional.',
    logoDesign: 'A identidade da MIBR sempre girou em torno do nome escrito em minúsculas, em itálico e com traços pesados. No retorno de 2018 a marca ganhou um escudo nas cores da bandeira do Brasil — verde, amarelo e azul —, criando forte identificação nacional nos torneios internacionais; depois, voltou ao letreiro minimalista, mais fácil de aplicar em uniformes e stickers.',
    logos: [
      { years: '2003–2012', src: 'assets/mibr-2003.webp', w: 640, h: 246,
        caption: 'O letreiro “mibr” da era do Counter-Strike 1.6, com uma estrela no canto, como nos escudos de clubes de futebol.' },
      { years: '2018', src: 'assets/mibr-2018.webp', w: 257, h: 297,
        caption: 'O escudo verde e amarelo com o losango e o círculo da bandeira, adotado no retorno da marca sob a Immortals.' },
      { years: '2018–atual', src: 'assets/mibr-atual.webp', w: 640, h: 256,
        caption: 'O letreiro minimalista, sem estrela e sem escudo, usado no CS:GO e no CS2.' }
    ]
  }
];
