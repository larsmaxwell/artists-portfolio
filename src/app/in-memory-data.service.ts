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
        ]
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
        ]
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
        ]
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
      }
    ];
    return {works};
  }

}
