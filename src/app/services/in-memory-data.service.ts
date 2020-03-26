import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const works = [
      {
        id: 1,
        title: "Comics Comics",
        permalink: "comics-comics",
        type: "zine",
        archive: true,
        created: "2016-04-12T00:00:00Z",
        description: "Comics Comics is a workbook zine filled with comic exploration of the show Fwiends and scenes from the latest and upcoming epic <em>Fugative, the DreamWalker</em> <a href=\"http://www.scribd.com/doc/279872848/Comics-Comics\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/comics-comics/cc1.jpg",
          "assets/images/comics-comics/cc2.jpg",
          "assets/images/comics-comics/cc3.jpg"
        ],
        album: 1
      },
      {
        id: 2,
        title: "Corridors",
        permalink: "corridors",
        type: "video",
        archive: false,
        created: "2016-04-14T00:00:00Z",
        mediaUrl: "https://www.youtube.com/embed/DXWDCu3Mze4",
        description: "Video created for the <a target=\"blank\" href=\"http://www.dallasobserver.com/event/beeflix-vol2-8184216\">Beeflix Video Series</a>. Poetry by Lauren Belmore. <a href=\"https://www.youtube.com/watch?v=DXWDCu3Mze4\">Link.</a><br>",
        images: [
          "assets/images/corridors/corridors.png"
        ],
        album: 2
      },
      {
        id: 3,
        title: "Dance Routine",
        permalink: "dance-routine",
        type: "interactive",
        archive: false,
        created: "2016-04-09T00:00:00Z",
        description: "An interactive private room. Click on the main gem to cause gems to fall from the cieling. <a href=\"http://mlauren.github.io/tjs/index.html\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/dance-routine/dr1.png",
          "assets/images/dance-routine/dr2.png",
          "assets/images/dance-routine/dr3.png",
          "assets/images/dance-routine/dr4.png"
        ]
      },
      {
        id: 4,
        title: "Dark Planet",
        permalink: "dark-planet",
        type: "zine",
        archive: false,
        created:"2015-01-13T00:00:00Z",
        description: "A dark comic about people that cannot understand the planet they live on. <a href=\"http://www.scribd.com/doc/285195259/DARK-PLANET-1\" target=\"_blank\">READ HERE.</a> ",
        images: [
          "assets/images/dark-planet/cover.png",
          "assets/images/dark-planet/p1.png",
          "assets/images/dark-planet/p2.png",
          "assets/images/dark-planet/p3.png",
          "assets/images/dark-planet/p4.png"    
        ]
      },
      {
        id: 5,
        title: "Donut Miracle",
        permalink: "donut-miracle",
        type: "interactive",
        created: "2016-11-20T00:00:00Z",
        archive: false,
        description: "An interactive wall of donuts. <a href=\"http://mlauren.github.io/tjs/donuts.html\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/donut-miracle/dm1.png",
          "assets/images/donut-miracle/dm2.png"
        ]
      },
      {
        id: 6,
        title: "Forest of Us",
        permalink: "forest-of-us",
        type: "zine",
        created: "2016-11-20T00:00:00Z",
        archive: false,
        description: "Ray, a dreamwalker, goes on a search for a spirit in the forests of Columbia.",
        buybtn: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RG94ZDRJZ8438",
        images: [
          "assets/images/forest-of-us/cover2.jpg",
          "assets/images/forest-of-us/Pg1.png",
          "assets/images/forest-of-us/Pg2.png",
          "assets/images/forest-of-us/Pg3.png"
        ]
      },
      {
        id: 7,
        title: "Frens Zine",
        permalink: "frens-zine",
        type: "zine",
        created: "2016-11-20T00:00:00Z",
        archive: false,
        description: "Solo show companion zine. A group of friends and their roudy antics.",
        buybtn: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BWUSRUZVP2KTL",
        images: [
          "assets/images/frens/cuteZine1.jpg",
          "assets/images/frens/cuteZine2.jpg",
          "assets/images/frens/cuteZine3.jpg",
          "assets/images/frens/cuteZine6.jpg"
        ]
      },
      {
        id: 8,
        title: "Nerve Kid II Deeip Rifts",
        permalink: "nerve-kid-ii-deeip-rifts",
        type: "zine",
        archive: true,
        created: "2014-11-20T00:00:00Z",
        description: "A comics workbook featuring a witch, a discoverable dildo, and a race up the stairs to the fighting arena. <a href=\"http://www.scribd.com/doc/205923263/Deeip-Rifts\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/nerve-kid-ii-deeip-rifts/nk1.jpg",
          "assets/images/nerve-kid-ii-deeip-rifts/nk2.jpg",
          "assets/images/nerve-kid-ii-deeip-rifts/nk3.jpg"
        ]
      },
      {
        id: 9,
        title: "Passing Thru",
        permalink: "passing-thru",
        type: "interactive",
        created: "2016-11-20T00:00:00Z",
        archive: false,
        description: "An interactive landscape with mirror and chalace. <a href=\"http://mlauren.github.io/tjs/donuts.html\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/passing/p1.png",
          "assets/images/passing/p2.png",
          "assets/images/passing/p3.png",
          "assets/images/passing/p4.png"
        ]
      },
      {
        id: 10,
        title: "Princess Simon",
        permalink: "princess-simon",
        type: "interactive",
        created: "2016-11-20T00:00:00Z",
        archive: false,
        description: "Princess Simon is a sentient bird who loves to be tweeted at. They love your pictures so much they wear it like a gown. Tweet @SimonHi to help them look their best and dress them up with your favorite image. JavaScript: Three.js, Twitter API, and Express server running on Node. <a href='http://www.princess-simon.com/'>www.princess-simon.com</a>",
        images: [
          "assets/images/princess-simon/princess-simon.png"
        ]
      },
      {
        id: 11,
        title: "Sprite Vol 1",
        permalink: "sprite-1",
        type: "zine",
        created: "2014-11-20T00:00:00Z",
        archive: true,
        description: "A digital collage zine. <a href=\"http://www.scribd.com/doc/232646104/Sprite\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/sprite-1/sp1-1.jpg",
          "assets/images/sprite-1/sp1-2.jpg",
          "assets/images/sprite-1/sp1-3.jpg"
        ]
      },
      {
        id: 12,
        title: "Sprite Vol 2",
        permalink: "sprite-2",
        type: "zine",
        created: "2014-11-20T00:00:00Z",
        archive: true,
        description: "A digital collage zine. <a href=\"http://www.scribd.com/doc/236089528/Sprites-Mag-Vol-2\" target=\"_blank\">See here.</a>",
        images: [
          "assets/images/sprite-2/3.cactus_cum.png",
          "assets/images/sprite-2/4.slimyorgans.png",
          "assets/images/sprite-2/5.personal-hatred.png",
          "assets/images/sprite-2/6.polar-vortex.png"
        ]
      },
      {
        id: 13,
        title: "Terry House Calls",
        permalink: "terry-house-calls",
        type: "zine",
        created: "2017-11-20T00:00:00Z",
        archive: false,
        description: "Terry is a businessman who travels through the cave of wonders to search for his best friend, a dog named Pepper.",
        buybtn: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=THPJ87Z92ZN8N",
        images: [
          "assets/images/terry-house-calls/cover.jpg",
          "assets/images/terry-house-calls/1.jpg",
          "assets/images/terry-house-calls/2.jpg",
          "assets/images/terry-house-calls/3.jpg"
        ]
      },
      {
        id: 14,
        title: "The Rabid Prince",
        permalink: "the-rabid-prince",
        type: "zine",
        created: "2018-11-20T00:00:00Z",
        archive: false,
        description: "Short comic. Prince Gilbert travels to Lingman to confront the Heart Diety, a lordly lord.",
        buybtn: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9RC3CBQX7RXJA",
        images: [
          "assets/images/the-rabid-prince/cover.jpg",
          "assets/images/the-rabid-prince/insideCover.jpg",
          "assets/images/the-rabid-prince/wp0.jpg",
          "assets/images/the-rabid-prince/wp1.jpg",
          "assets/images/the-rabid-prince/wp2.jpg",
          "assets/images/the-rabid-prince/wp3.jpg",
          "assets/images/the-rabid-prince/wp4.jpg"      
        ],
        album: 16
      },
      {
        id: 15,
        created: "2016-11-20T00:00:00Z",
        title: "You are alone",
        permalink: "you-are-alone",
        type: "video",
        archive: false,
        mediaUrl: "https://www.youtube.com/embed/7zvhHbOR-gc",
        description: "Video and Poetry by me. <a href=\"https://www.youtube.com/watch?v=7zvhHbOR-gc\">Link.</a>"
      },
      {
        id: 16,
        title: "Ufime",
        permalink: "ufime",
        type: "zine",
        created: "2019-04-01T00:00:00Z",
        archive: false,
        description: "Alma and Jo face the worst of the ocean in a fantasy post climate event future. The two together experience separate realities of the world. One of these realities is filled with horror, but the other is safe. In order to find an item that was abandoned, they venture to the area of the city that was covered in water and overtaken by strange beings.",
        buybtn: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=97WEHPKSQYEY2"
      },
      {
        id: 17,
        title: "Underground",
        permalink: "Underground",
        type: "zine",
        created: "2019-10-30T00:00:00Z",
        archive: false,
        description: "A ghost relives their death."
      }
    ];
    const albums = [
      {
        id: 1,
        title: "Comics Comics",
        workId: 1,
        images: [
          {
            id: "cc1",
            url: "assets/images/comics-comics/cc1.jpg",
            show: false
          },
          {
            id: "cc2",
            url: "assets/images/comics-comics/cc2.jpg",
            show: false
          },
          {
            id: "cc3",
            url: "assets/images/comics-comics/cc3.jpg",
            show: false
          }
        ]
      },
      {
        id: 2,
        title: "Corridors",
        workId: 2,
        images: [
          {
            id: "cor1",
            url: "assets/images/corridors/corridors.png"
          }
        ]
      },
      {
        id: 3,
        title: "Dance Routine",
        workId: 3,
        images: [
          {
            id: "dr1",
            url: "assets/images/dance-routine/dr1.png"
          },
          {
            id: "dr2",
            url: "assets/images/dance-routine/dr2.png"
          },
          {
            id: "dr3",
            url: "assets/images/dance-routine/dr3.png"
          },
          {
            id: "dr4",
            url: "assets/images/dance-routine/dr4.png"
          }
        ]
      },
      {
        id: 4,
        title: "Dark Planet",
        workId: 4,
        images: [
          {
            id: 0,
            url: "assets/images/dark-planet/cover.png",
            show: false
          },
          {
            id: 1,
            url: "assets/images/dark-planet/p1.png",
            show: false
          },
          {
            id: 2,
            url: "assets/images/dark-planet/p2.png",
            show: false
          },
          {
            id: 3,
            url: "assets/images/dark-planet/p3.png",
            show: false
          },
          {
            id: 4,
            url: "assets/images/dark-planet/p4.png",
            show: false
          }
        ]
      },
      {
        id: 5,
        title: "Donut Miracle",
        workId: 5,
        images: [
          {
            id: 0,
            url: "assets/images/donut-miracle/dm1.png"
          },
          {
            id: 1,
            url: "assets/images/donut-miracle/dm2.png"
          }
        ]
      },
      {
        id: 6,
        title: "Forest of Us",
        workId: 6,
        images: [
          {
            id: 0,
            url: "assets/images/forest-of-us/cover2.jpg"
          },
          {
            id: 1,
            url: "assets/images/forest-of-us/Pg1.png"
          },
          {
            id: 2,
            url: "assets/images/forest-of-us/Pg2.png"
          },
          {
            id: 3,
            url: "assets/images/forest-of-us/Pg3.png"
          }
        ]
      },
      {
        id: 7,
        title: "Frens Zine",
        workId: 7,
        images: [
          {
            id: 0,
            url: "assets/images/frens/cuteZine1.jpg"
          },
          {
            id: 1,
            url: "assets/images/frens/cuteZine2.jpg"
          },
          {
            id: 2,
            url: "assets/images/frens/cuteZine3.jpg"
          },
          {
            id: 3,
            url: "assets/images/frens/cuteZine6.jpg"
          }
        ]
      },
      {
        id: 8,
        title: "Nerve Kid II Deeip Rifts",
        workId: 8,
        images: [
          {
            id: 0,
            url: "assets/images/nerve-kid-ii-deeip-rifts/nk1.jpg"
          },
          {
            id: 1,
            url: "assets/images/nerve-kid-ii-deeip-rifts/nk2.jpg"
          },
          {
            id: 2,
            url: "assets/images/nerve-kid-ii-deeip-rifts/nk3.jpg"
          }
        ]
      },
      {
        id: 9,
        title: "Passing Thru",
        workId: 9,
        images: [
          {
            id: 0,
            url: "assets/images/passing/p1.png"
          },
          {
            id: 1,
            url: "assets/images/passing/p2.png"
          },
          {
            id: 2,
            url: "assets/images/passing/p3.png"
          },
          {
            id: 3,
            url: "assets/images/passing/p4.png"
          }
        ]
      },
      {
        id: 10,
        title: "Princess Simon",
        workId: 10,
        images: [
          {
            id: 0,
            url: "assets/images/princess-simon/princess-simon.png"
          }
        ]
      },
      {
        id: 11,
        title: "Sprite Vol 1",
        workId: 11,
        images: [
          {
            id: 0,
            url: "assets/images/sprite-1/sp1-1.jpg"
          },
          {
            id: 1,
            url: "assets/images/sprite-1/sp1-2.jpg"
          },
          {
            id: 2,
            url: "assets/images/sprite-1/sp1-3.jpg"
          }
        ]
      },
      {
        id: 12,
        title: "Sprite Vol 2",
        workId: 12,
        images: [
          {
            id: 0,
            url: "assets/images/sprite-2/3.cactus_cum.png"
          },
          {
            id: 1,
            url: "assets/images/sprite-2/4.slimyorgans.png"
          },
          {
            id: 2,
            url: "assets/images/sprite-2/5.personal-hatred.png"
          },
          {
            id: 3,
            url: "assets/images/sprite-2/6.polar-vortex.png"
          }
        ]
      },
      {
        id: 13,
        title: "Terry House Calls",
        workId: 13,
        images: [
          {
            id: 0,
            url: "assets/images/terry-house-calls/cover.jpg",
            show: false
          },
          {
            id: 1,
            url: "assets/images/terry-house-calls/1.jpg",
            show: false
          },
          {
            id: 2,
            url: "assets/images/terry-house-calls/2.jpg",
            show: false
          },
          {
            id: 3,
            url: "assets/images/terry-house-calls/3.jpg",
            show: false
          },
          {
            id: 4,
            url: "assets/images/terry-house-calls/thcCoverPhoto.jpg",
            show: false
          },
          {
            id: 5,
            url: "assets/images/terry-house-calls/thcPhoto.jpg",
            show: false
          }
        ]
      },
      {
        id: 14,
        title: "The Rabid Prince",
        workId: 14,
        images: [
          {
            id: 0,
            url: "assets/images/the-rabid-prince/RpPhoto.jpg",
            show: false
          },
          {
            id: 1,
            url: "assets/images/the-rabid-prince/insideCover.jpg",
            show: false
          },
          {
            id: 2,
            url: "assets/images/the-rabid-prince/wp0.jpg",
            show: false
          },
          {
            id: 3,
            url: "assets/images/the-rabid-prince/wp1.jpg",
            show: false
          },
          {
            id: 4,
            url: "assets/images/the-rabid-prince/wp2.jpg",
            show: false
          },
          {
            id: 5,
            url: "assets/images/the-rabid-prince/wp3.jpg",
            show: false
          },
          {
            id: 6,
            url: "assets/images/the-rabid-prince/wp4.jpg",
            show: false
          },
          {
            id: 7,
            url: "assets/images/the-rabid-prince/RpPhoto1.jpg",
            show: false
          }
        ]
      },
      {
        id: 16,
        title: "Ufime",
        workId: 16,
        images: [
          {
            id: 0,
            url: "assets/images/ufime/cover-new.jpg",
            show: false
          },
          {
            id: 1,
            url: "assets/images/ufime/Ufime1.jpg",
            show: false
          },
          {
            id: 2,
            url: "assets/images/ufime/Ufime2.jpg",
            show: false
          },
          {
            id: 3,
            url: "assets/images/ufime/Ufime3.jpg",
            show: false
          },
          {
            id: 4,
            url: "assets/images/ufime/Ufime4.jpg",
            show: false
          },
          {
            id: 5,
            url: "assets/images/ufime/Ufime5.jpg",
            show: false
          },
          {
            id: 6,
            url: "assets/images/ufime/Ufime6.jpg",
            show: false
          },
          {
            id: 7,
            url: "assets/images/ufime/Ufime7.jpg",
            show: false
          },
          {
            id: 8,
            url: "assets/images/ufime/Ufime8.jpg",
            show: false
          },
          {
            id: 9,
            url: "assets/images/ufime/Ufime9.jpg",
            show: false
          },
          {
            id: 10,
            url: "assets/images/ufime/Ufime10.jpg",
            show: false
          },
          {
            id: 11,
            url: "assets/images/ufime/Ufime11.jpg",
            show: false
          },
          {
            id: 12,
            url: "assets/images/ufime/Ufime12.jpg",
            show: false
          },
          {
            id: 13,
            url: "assets/images/ufime/Ufime13.jpg",
            show: false
          },
          {
            id: 14,
            url: "assets/images/ufime/Ufime14.jpg",
            show: false
          },
          {
            id: 15,
            url: "assets/images/ufime/Ufime15.jpg",
            show: false
          },
          {
            id: 15,
            url: "assets/images/ufime/Ufime15.jpg",
            show: false
          },
          {
            id: 16,
            url: "assets/images/ufime/Ufime18ForgotAPage.jpg",
            show: false
          },
          {
            id: 17,
            url: "assets/images/ufime/Ufime16.jpg",
            show: false
          },
          {
            id: 18,
            url: "assets/images/ufime/Ufime17.jpg",
            show: false
          },
          {
            id: 19,
            url: "assets/images/ufime/Ufime18.jpg",
            show: false
          },
          {
            id: 20,
            url: "assets/images/ufime/Ufime19.jpg",
            show: false
          },
          {
            id: 21,
            url: "assets/images/ufime/Ufime20.jpg",
            show: false
          },
          {
            id: 22,
            url: "assets/images/ufime/Ufime21.jpg",
            show: false
          },
          {
            id: 23,
            url: "assets/images/ufime/Ufime22.jpg",
            show: false
          },
          {
            id: 24,
            url: "assets/images/ufime/Ufime23.jpg",
            show: false
          },
          {
            id: 25,
            url: "assets/images/ufime/Ufime24.jpg",
            show: false
          },
          {
            id: 26,
            url: "assets/images/ufime/Ufime25.jpg",
            show: false
          },
          {
            id: 27,
            url: "assets/images/ufime/Ufime26.jpg",
            show: false
          },
          {
            id: 28,
            url: "assets/images/ufime/Ufime27.jpg",
            show: false
          },
          {
            id: 29,
            url: "assets/images/ufime/Ufime28.jpg",
            show: false
          },
          {
            id: 30,
            url: "assets/images/ufime/Ufime29.jpg",
            show: false
          },
          {
            id: 31,
            url: "assets/images/ufime/Ufime30.jpg",
            show: false
          },
          {
            id: 32,
            url: "assets/images/ufime/Ufime31.jpg",
            show: false
          },
          {
            id: 33,
            url: "assets/images/ufime/Ufime32.jpg",
            show: false
          },
          {
            id: 34,
            url: "assets/images/ufime/Ufime33.jpg",
            show: false
          },
          {
            id: 35,
            url: "assets/images/ufime/Ufime34.jpg",
            show: false
          },
          {
            id: 36,
            url: "assets/images/ufime/Ufime35.jpg",
            show: false
          },
          {
            id: 37,
            url: "assets/images/ufime/Ufime36.jpg",
            show: false
          },
          {
            id: 38,
            url: "assets/images/ufime/Ufime37.jpg",
            show: false
          },
          {
            id: 39,
            url: "assets/images/ufime/Ufime38.jpg",
            show: false
          },
          {
            id: 40,
            url: "assets/images/ufime/Ufime39.jpg",
            show: false
          },
          {
            id: 41,
            url: "assets/images/ufime/Ufime40.jpg",
            show: false
          },
          {
            id: 42,
            url: "assets/images/ufime/Ufime41.jpg",
            show: false
          },
          {
            id: 43,
            url: "assets/images/ufime/Ufime42.jpg",
            show: false
          },
          {
            id: 44,
            url: "assets/images/ufime/Ufime43.jpg",
            show: false
          },
          {
            id: 45,
            url: "assets/images/ufime/Ufime44.jpg",
            show: false
          },
          {
            id: 46,
            url: "assets/images/ufime/Ufime45.jpg",
            show: false
          },
          {
            id: 47,
            url: "assets/images/ufime/Ufime46.jpg",
            show: false
          },
          {
            id: 48,
            url: "assets/images/ufime/Ufime47.jpg",
            show: false
          },
          {
            id: 49,
            url: "assets/images/ufime/Ufime48.jpg",
            show: false
          },
          {
            id: 50,
            url: "assets/images/ufime/Ufime49.jpg",
            show: false
          },
          {
            id: 51,
            url: "assets/images/ufime/Ufime50.jpg",
            show: false
          },
          {
            id: 52,
            url: "assets/images/ufime/Ufime51.jpg",
            show: false
          },
          {
            id: 53,
            url: "assets/images/ufime/Ufime52.jpg",
            show: false
          },
          {
            id: 54,
            url: "assets/images/ufime/Ufime53.jpg",
            show: false
          },
          {
            id: 55,
            url: "assets/images/ufime/Ufime54.jpg",
            show: false
          },
          {
            id: 57,
            url: "assets/images/ufime/UfimeInsideBooklet0.jpg",
            show: false
          },
          {
            id: 58,
            url: "assets/images/ufime/UfimeInsideBooklet1.jpg",
            show: false
          }
        ]
      },
      {
        id: 17,
        title: "Underground",
        workId: 17,
        images: [
          {
            id: 0,
            url: "assets/images/underground/cover.jpg",
            show: false
          },
          {
            id: 1,
            url: "assets/images/underground/1.png",
            show: false
          },
          {
            id: 2,
            url: "assets/images/underground/13.png",
            show: false
          },
          {
            id: 3,
            url: "assets/images/underground/15.png",
            show: false
          },
          {
            id: 4,
            url: "assets/images/underground/16.png",
            show: false
          },
          {
            id: 5,
            url: "assets/images/underground/22.png",
            show: false
          },
          {
            id: 6,
            url: "assets/images/underground/23.png",
            show: false
          },
          {
            id: 7,
            url: "assets/images/underground/25.png",
            show: false
          }
        ]
      },
    ];
    return {works, albums};
  }

}
