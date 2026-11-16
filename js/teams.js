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
     invert   opcional; true = renderiza a logo em branco
     light    opcional; true = logo escura, mostrada sobre fundo claro

   titles: [{ year, name, major }] — mais recente primeiro; major: true só para Majors vencidos.
   As logos ficam em ordem cronológica (a última é a atual).
   ========================================================== */
window.TEAMS = [
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
    titles: [
      { year: 2019, name: 'Major StarLadder Berlim', major: true },
      { year: 2019, name: 'Major IEM Katowice', major: true },
      { year: 2018, name: 'Major FACEIT Londres', major: true },
      { year: 2018, name: 'Intel Grand Slam (temporada 1)' },
      { year: 2017, name: 'Major ELEAGUE Atlanta', major: true }
    ],
    logos: [
      { years: '2016–atual', src: 'assets/astralis-2016.webp', w: 406, h: 492,
        caption: 'A primeira e única logo da Astralis. O formato nunca mudou desde a fundação; apenas o tom de vermelho é ajustado de tempos em tempos.' }
    ]
  },
  {
    slug: 'cloud9',
    name: 'Cloud9',
    fullName: 'Cloud9',
    aliases: ['c9'],
    founded: 2013,
    country: 'Estados Unidos',
    region: 'Américas',
    colors: [
      { name: 'Azul-celeste', hex: '#00A8E8' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em 2013 por Jack Etienne a partir de um time de League of Legends, a Cloud9 é uma das organizações mais populares da América do Norte. Seu grande momento no Counter-Strike veio no ELEAGUE Major Boston 2018, quando se tornou a primeira equipe norte-americana a vencer um Major, numa final épica contra a FaZe decidida na prorrogação do terceiro mapa.',
    logoDesign: 'A logo é uma nuvem desenhada com uma única linha contínua, que forma também o número 9 — uma tradução literal do nome “cloud nine”, expressão em inglês para “estar nas nuvens”. Em 2023 o degradê azul foi trocado por uma cor sólida, mais limpa.',
    titles: [
      { year: 2018, name: 'Major ELEAGUE Boston', major: true },
      { year: 2016, name: 'ESL Pro League (temporada 4)' }
    ],
    logos: [
      { years: '2013–2023', src: 'assets/cloud9-2013.webp', w: 640, h: 460,
        caption: 'A nuvem em degradê azul que acompanhou a Cloud9 no título do Major de Boston 2018.' },
      { years: '2023–atual', src: 'assets/cloud9-2023.webp', w: 640, h: 441,
        caption: 'A mesma nuvem em azul sólido, sem degradê.' }
    ]
  },
  {
    slug: 'faze',
    name: 'FaZe',
    fullName: 'FaZe Clan',
    aliases: ['faze clan'],
    founded: 2010,
    country: 'Estados Unidos',
    region: 'Américas',
    colors: [
      { name: 'Vermelho', hex: '#E43A2C' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Criada em 30 de maio de 2010 como o canal “FaZe Sniping”, dedicado a vídeos de trickshots de Call of Duty no YouTube, a FaZe Clan se transformou em uma das maiores organizações de esports e entretenimento do mundo. Sua entrada no Counter-Strike aconteceu em janeiro de 2016, ao assumir o elenco internacional da G2 Esports. Em 2022, a equipe conquistou o PGL Major Antuérpia, tornando-se a primeira formação totalmente internacional a vencer um Major.',
    logoDesign: 'O símbolo combina as letras “F” e “C” sobrepostas — a segunda espelhada — formando um escudo pontiagudo com as iniciais da organização. Com o tempo ganhou um contorno preto e um vermelho mais quente, mas o formato é o mesmo desde os tempos de Call of Duty.',
    titles: [
      { year: 2024, name: 'Vice-campeã do Major de Xangai' },
      { year: 2022, name: 'Major PGL Antuérpia', major: true },
      { year: 2022, name: 'IEM Katowice' },
      { year: 2018, name: 'Vice-campeã do Major de Boston' }
    ],
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
    titles: [
      { year: 2015, name: 'Major ESL One Colônia', major: true },
      { year: 2015, name: 'Major ESL One Katowice', major: true },
      { year: 2013, name: 'Major DreamHack Winter', major: true }
    ],
    logos: [
      { years: '2004–2015', src: 'assets/fnatic-2004.webp', w: 640, h: 630,
        caption: 'A primeira logo da Fnatic: o símbolo laranja cheio de curvas, com o nome em letras quadradas por baixo.' },
      { years: '2015–2020', src: 'assets/fnatic-2015.webp', w: 610, h: 640,
        caption: 'Uma pequena simplificação: o símbolo ficou mais encorpado e a tipografia do nome foi redesenhada, na época dos títulos de Katowice e Colônia.' },
      { years: '2020–atual', src: 'assets/fnatic-2020.webp', w: 640, h: 417,
        caption: 'O rebranding de 2020 trocou as curvas por um monograma de linhas retas e cortes diagonais, sem o nome por baixo.' }
    ]
  },
  {
    slug: 'furia',
    name: 'FURIA',
    fullName: 'FURIA Esports',
    aliases: ['furia'],
    founded: 2017,
    country: 'Brasil',
    region: 'Brasil',
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em agosto de 2017 por Jaime Pádua, André Akkari e Cris Guedes, a FURIA se tornou rapidamente a principal força do Counter-Strike brasileiro, com um estilo agressivo comandado por Andrei “arT” Piovezan. Viveu sua melhor campanha em Majors no IEM Rio 2022, quando chegou à semifinal empurrada pela torcida, e em 2023 trouxe Gabriel “FalleN” Toledo para liderar o time.',
    logoDesign: 'O símbolo é a cabeça de uma pantera negra rugindo, de perfil, com contorno branco — uma tradução direta da fúria do nome. O desenho nunca mudou; em 2023, o time de CS passou a usar uma variação com contorno dourado no lugar do branco.',
    titles: [
      { year: 2022, name: 'Semifinal do Major IEM Rio' },
      { year: 2020, name: 'ESL Pro League (temporada 12, América do Norte)' }
    ],
    logos: [
      { years: '2017–atual', src: 'assets/furia-2017.webp', w: 640, h: 623, light: true,
        caption: 'A pantera negra com contorno branco, usada desde a fundação.' }
    ]
  },
  {
    slug: 'g2',
    name: 'G2',
    fullName: 'G2 Esports',
    aliases: ['gamers2', 'g2 esports'],
    founded: 2014,
    country: 'Espanha',
    region: 'Europa',
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Vermelho', hex: '#E83820' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Fundada em 2014 por Carlos “ocelote” Rodríguez com o nome Gamers2, a organização virou G2 Esports em 2015 e hoje tem sede em Berlim. No Counter-Strike, reuniu algumas das maiores estrelas internacionais do jogo, chegou à final do PGL Major Estocolmo 2021 e conquistou a IEM Katowice 2023, um dos torneios mais prestigiados do circuito.',
    logoDesign: 'A logo é uma máscara de samurai vista de frente, com o elmo pontiagudo e as letras “G2” desenhadas no rosto. O tom metálico da primeira versão deu lugar, em 2019, a um desenho branco e chapado, com contorno preto e olhos vermelhos — mais legível em telas pequenas e em stickers.',
    titles: [
      { year: 2025, name: 'BLAST Open Fall' },
      { year: 2023, name: 'IEM Colônia' },
      { year: 2023, name: 'IEM Katowice' },
      { year: 2021, name: 'Vice-campeã do Major de Estocolmo' }
    ],
    logos: [
      { years: '2015–2019', src: 'assets/g2-2015.webp', w: 553, h: 640,
        caption: 'O samurai metálico, em tons de prata e cinza, adotado quando a Gamers2 virou G2 Esports.' },
      { years: '2019–atual', src: 'assets/g2-2019.webp', w: 561, h: 640,
        caption: 'O mesmo samurai, agora branco e chapado, com contorno preto e olhos vermelhos.' }
    ]
  },
  {
    slug: 'imperial',
    name: 'Imperial',
    fullName: 'Imperial Esports',
    aliases: ['imperial'],
    founded: 2018,
    country: 'Brasil',
    region: 'Brasil',
    colors: [
      { name: 'Verde', hex: '#08D060' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Criada em 2018, a Imperial entrou para a história do CS brasileiro em 2022 com o projeto “The Last Dance”, que reuniu FalleN, fer, fnx e boltz — campeões de Major pela Luminosity e pela SK em 2016 — ao lado do jovem VINI. O time voltou a disputar Majors e lotou as transmissões brasileiras até 2023, quando FalleN se transferiu para a FURIA.',
    logoDesign: 'A identidade da Imperial gira em torno do elmo de um guerreiro espartano, sempre em verde-neon. A primeira versão era um brasão circular, cheio de detalhes, com o elmo e duas espadas cruzadas; em 2022 o elmo virou uma forma geométrica minimalista, e em 2025 o desenho foi simplificado mais uma vez.',
    titles: [],
    logos: [
      { years: '2021–2022', src: 'assets/imperial-2021.webp', w: 640, h: 640,
        caption: 'O brasão circular com o elmo espartano, duas espadas cruzadas e o nome escrito em volta.' },
      { years: '2022–2025', src: 'assets/imperial-2022.webp', w: 570, h: 640,
        caption: 'O elmo reduzido a formas geométricas em verde — a logo da era “The Last Dance”.' },
      { years: '2025–atual', src: 'assets/imperial-2025.webp', w: 506, h: 640,
        caption: 'Uma versão ainda mais simples, com blocos sólidos em dois tons de verde.' }
    ]
  },
  {
    slug: 'liquid',
    name: 'Liquid',
    fullName: 'Team Liquid',
    aliases: ['team liquid', 'tl'],
    founded: 2000,
    country: 'Holanda',
    region: 'Américas',
    colors: [
      { name: 'Azul-marinho', hex: '#001038' },
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Azul-claro', hex: '#68AEDC' }
    ],
    history: 'A Team Liquid nasceu em 2000 como um site da comunidade de StarCraft, criado na Holanda por Victor “Nazgul” Goossens, e se tornou uma das maiores organizações de esports do mundo, com base nos Estados Unidos e na Europa. No Counter-Strike desde 2015, chegou à final do Major ESL One Colônia 2016 e, em 2019, viveu seu auge ao conquistar o Intel Grand Slam, prêmio dado a quem vence quatro grandes torneios em sequência.',
    logoDesign: 'O cavalo da Team Liquid apareceu num banner do site em 2001 e foi redesenhado pela comunidade ao longo dos anos. A crina em faixas lembra um líquido em movimento — daí o nome. A organização nunca trocou o símbolo, mas foi refinando o desenho: o cavalo ganhou traços mais firmes e, a partir de 2020, passou a ficar inteiro dentro de um escudo.',
    titles: [
      { year: 2019, name: 'Intel Grand Slam (temporada 2)' },
      { year: 2016, name: 'Vice-campeã do Major ESL One Colônia' }
    ],
    logos: [
      { years: '2015–2017', src: 'assets/liquid-2015.webp', w: 482, h: 479,
        caption: 'O cavalo azul-claro, com a crina em faixas e a cabeça desenhando meio escudo, da época em que a Liquid entrou no Counter-Strike.' },
      { years: '2017–2020', src: 'assets/liquid-2017.webp', w: 640, h: 639,
        caption: 'Um azul mais escuro e traços mais definidos na crina e no focinho.' },
      { years: '2020–2024', src: 'assets/liquid-2020.webp', w: 563, h: 640,
        caption: 'O cavalo passa a ficar dentro de um escudo com contorno dourado, em azul-marinho e branco.' },
      { years: '2024–atual', src: 'assets/liquid-2024.webp', w: 562, h: 640,
        caption: 'O escudo mais recente, com proporções ajustadas e o cavalo em azul-marinho sobre fundo branco.' }
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
    titles: [
      { year: 2018, name: 'Semifinal do Major de Londres' },
      { year: 2006, name: 'CPL Winter (campeonato mundial)' }
    ],
    logos: [
      { years: '2003–2012', src: 'assets/mibr-2003.webp', w: 640, h: 246,
        caption: 'O letreiro “mibr” da era do Counter-Strike 1.6, com uma estrela no canto, como nos escudos de clubes de futebol.' },
      { years: '2018', src: 'assets/mibr-2018.webp', w: 257, h: 297,
        caption: 'O escudo verde e amarelo com o losango e o círculo da bandeira, adotado no retorno da marca sob a Immortals.' },
      { years: '2018–atual', src: 'assets/mibr-atual.webp', w: 640, h: 256,
        caption: 'O letreiro minimalista, sem estrela e sem escudo, usado no CS:GO e no CS2.' }
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
    titles: [
      { year: 2026, name: 'IEM Pequim' },
      { year: 2024, name: 'ESL Pro League (temporada 19)' },
      { year: 2023, name: 'ESL Pro League (temporada 18)' },
      { year: 2019, name: 'ESL Pro League (temporada 10)' }
    ],
    logos: [
      { years: '2002–2021', src: 'assets/mouz-2002.webp', w: 365, h: 200,
        caption: 'A logo original da mousesports, usada por quase 20 anos.' },
      { years: '2021–atual', src: 'assets/mouz-2021.webp', w: 427, h: 450,
        caption: 'O distintivo em forma de coração, unindo o rosto de um mouse à letra “M”, que marcou a transição de mousesports para MOUZ.' }
    ]
  },
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
    logoDesign: 'As letras N-A-V-I, largas e inclinadas, sugerem velocidade e ataque. Na versão clássica elas eram amarelas sobre uma placa preta, com o nome “Natus Vincere” em branco por baixo; no rebranding de junho de 2021, lançado junto com o novo uniforme, o texto saiu e o símbolo virou um paralelogramo amarelo com as letras recortadas em preto, mais limpo e geométrico.',
    titles: [
      { year: 2024, name: 'Major PGL Copenhague', major: true },
      { year: 2021, name: 'Major PGL Estocolmo', major: true },
      { year: 2010, name: 'WCG (CS 1.6)' },
      { year: 2010, name: 'ESWC (CS 1.6)' },
      { year: 2010, name: 'IEM IV World Championship (CS 1.6)' }
    ],
    logos: [
      { years: '2009–2021', src: 'assets/navi-2009.webp', w: 640, h: 570,
        caption: 'O emblema clássico: as letras NAVI em amarelo sobre uma placa preta inclinada, com “Natus Vincere” escrito em branco por baixo. Acompanhou o título triplo de 2010 e quase toda a era s1mple.' },
      { years: '2021–atual', src: 'assets/navi-2021.webp', w: 600, h: 527,
        caption: 'Versão apresentada em junho de 2021: o nome por extenso foi removido e as cores se inverteram, com as letras recortadas em preto dentro do amarelo. É a logo dos títulos de Major de 2021 e 2024.' }
    ]
  },
  {
    slug: 'nip',
    name: 'NiP',
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
    titles: [
      { year: 2015, name: 'Vice-campeã do Major de Katowice' },
      { year: 2014, name: 'Major ESL One Colônia', major: true },
      { year: 2014, name: 'Vice-campeã do Major de Katowice' },
      { year: 2013, name: 'Vice-campeã do Major DreamHack Winter' }
    ],
    logos: [
      { years: '2000–2006', src: 'assets/nip-2000.webp', w: 360, h: 245,
        caption: 'A primeira logo da NiP: as letras N, I e P em traços pesados e irregulares, com o visual caseiro típico dos clãs do início dos anos 2000.' },
      { years: '2006–2012', src: 'assets/nip-2006.webp', w: 498, h: 585,
        caption: 'Um losango azul atravessado por uma seta dupla, que forma o “I” entre o N e o P.' },
      { years: '2012–2021', src: 'assets/nip-2012.webp', w: 640, h: 640,
        caption: 'O icônico shuriken dourado que acompanhou a NiP durante a era de ouro do CS:GO, incluindo a sequência de 87 mapas e o Major de Colônia 2014.' },
      { years: '2021–atual', src: 'assets/nip-2021.webp', w: 640, h: 640,
        caption: 'A versão modernizada do shuriken, incorporando o caractere japonês “nin” e a nova paleta em amarelo neon.' }
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
    titles: [
      { year: 2016, name: 'Major ESL One Colônia', major: true }
    ],
    logos: [
      { years: '1997–2003', src: 'assets/sk-1997.webp', w: 640, h: 619,
        caption: 'A primeira marca, dos tempos de Schroet Kommando: um “SK” anguloso, de letras cortadas em diagonal.' },
      { years: '2003–2022', src: 'assets/sk-2003.webp', w: 640, h: 640,
        caption: 'O monograma arredondado em que o “S” se transforma no “K”. Estampou os títulos do 1.6 e o Major de Colônia 2016.' },
      { years: '2022–atual', src: 'assets/sk-2022.webp', w: 638, h: 640,
        caption: 'O monograma refinado nos 25 anos da organização, com espessuras e cantos ajustados para o novo sistema visual.' }
    ]
  },
  {
    slug: 'spirit',
    name: 'Spirit',
    fullName: 'Team Spirit',
    aliases: ['team spirit'],
    founded: 2015,
    country: 'Rússia',
    region: 'Leste Europeu',
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Fundada em 2015, a Team Spirit ficou mundialmente famosa ao vencer o The International 2021 de Dota 2 como azarona. No Counter-Strike, apostou no jovem Danil “donk” Kryshkovets e conquistou o Perfect World Shanghai Major 2024 contra a FaZe; donk foi eleito o MVP e, aos 17 anos, tornou-se o campeão de Major mais jovem da era CS2.',
    logoDesign: 'O símbolo da Spirit é um dragão. As primeiras versões eram ilustrações cheias de detalhes — metal, escamas e o nome escrito junto —, e o verde aparecia como cor de destaque. A partir de 2021 o dragão virou uma silhueta branca, de perfil, com poucos cortes e sem nenhum texto.',
    titles: [
      { year: 2024, name: 'Major Perfect World Xangai', major: true }
    ],
    logos: [
      { years: '2015–2016', src: 'assets/spirit-2015.webp', w: 369, h: 478,
        caption: 'Um dragão prateado em estilo metálico, enrolado em forma de “S”.' },
      { years: '2016–2021', src: 'assets/spirit-2016.webp', w: 528, h: 640,
        caption: 'O dragão ilustrado com detalhes em verde, segurando o nome “TEAM SPIRIT”.' },
      { years: '2021–atual', src: 'assets/spirit-2021.webp', w: 549, h: 640,
        caption: 'A silhueta branca e minimalista do dragão, levemente refinada em 2022. É a logo do título no Major de Xangai 2024.' }
    ]
  },
  {
    slug: 'virtuspro',
    name: 'Virtus.pro',
    fullName: 'Virtus.pro',
    aliases: ['vp', 'virtus pro', 'outsiders'],
    founded: 2003,
    country: 'Rússia',
    region: 'Leste Europeu',
    colors: [
      { name: 'Laranja', hex: '#F06800' },
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco', hex: '#FFFFFF' }
    ],
    history: 'Fundada em 2003, a Virtus.pro é uma das organizações mais tradicionais do Leste Europeu. No CS:GO, ficou marcada pela “Golden Five” polonesa — TaZ, NEO, pashaBiceps, Snax e byali —, que venceu o Major EMS One Katowice 2014. Em 2022, competindo sob o nome Outsiders por causa das sanções impostas a organizações russas, conquistou o IEM Rio Major; o nome Virtus.pro voltou a ser usado em 2023.',
    logoDesign: 'O símbolo da Virtus.pro é um urso-polar de cara fechada, mostrando os dentes. Na versão clássica, o urso aparecia de perfil com uma faixa laranja escrita “VIRTUS.PRO”; no redesenho de 2019, apresentado nos 15 anos do clube, o urso passou a ficar de frente, encaixado num escudo em forma de “V”, com menos detalhes e traços mais fortes.',
    titles: [
      { year: 2022, name: 'Major IEM Rio (como Outsiders)', major: true },
      { year: 2014, name: 'Major EMS One Katowice', major: true }
    ],
    logos: [
      { years: 'até 2018', src: 'assets/vp-classic.webp', w: 618, h: 640,
        caption: 'O urso-polar de perfil com a faixa laranja “VIRTUS.PRO” — a logo da era da Golden Five polonesa.' },
      { years: '2019–atual', src: 'assets/vp-2019.webp', w: 640, h: 625,
        caption: 'O urso redesenhado de frente, dentro de um escudo em “V”, apresentado nos 15 anos da organização.' }
    ]
  },
  {
    slug: 'vitality',
    name: 'Vitality',
    fullName: 'Team Vitality',
    aliases: ['vitality', 'vit'],
    founded: 2013,
    country: 'França',
    region: 'Europa',
    colors: [
      { name: 'Amarelo', hex: '#F8F800' },
      { name: 'Dourado', hex: '#F0C830' },
      { name: 'Preto', hex: '#000000' }
    ],
    history: 'Fundada em agosto de 2013 em Paris, a Team Vitality começou no Call of Duty e se tornou o maior clube de esports da França. No Counter-Strike desde 2018, construiu seu time em torno de Mathieu “ZywOo” Herbaut e do capitão Dan “apEX” Madesclaire: venceu o BLAST.tv Paris Major 2023 diante da própria torcida e, em 2025, viveu uma temporada histórica, com os títulos do Major de Austin e do Major de Budapeste — a primeira equipe a vencer dois Majors seguidos no CS2.',
    logoDesign: 'O símbolo é uma abelha vista de frente, com as asas abertas formando um “V” de Vitality. A cabeça dourada lembra também a silhueta da Torre Eiffel, uma homenagem às raízes parisienses do clube. Em 2023 o emblema foi simplificado para uma única cor, o amarelo, com respiros entre as formas.',
    titles: [
      { year: 2025, name: 'Major StarLadder Budapeste', major: true },
      { year: 2025, name: 'Major BLAST.tv Austin', major: true },
      { year: 2025, name: 'IEM Katowice' },
      { year: 2023, name: 'Major BLAST.tv Paris', major: true }
    ],
    logos: [
      { years: '2013–2018', src: 'assets/vitality-2013.webp', w: 497, h: 640,
        caption: 'A primeira abelha da Vitality, com asas prateadas e cabeça dourada, usada nos primeiros anos do clube.' },
      { years: '2018–2023', src: 'assets/vitality-2018.webp', w: 500, h: 640,
        caption: 'As asas ficaram brancas e os traços mais limpos, com contorno preto — a logo da chegada ao CS:GO e do título em Paris.' },
      { years: '2023–atual', src: 'assets/vitality-2023.webp', w: 528, h: 640,
        caption: 'A versão monocromática em amarelo, com espaços entre as formas. É a logo da era de domínio no CS2.' }
    ]
  }
];
