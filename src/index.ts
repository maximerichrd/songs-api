import { knex } from "./knex/knex"

interface Song {
    name: string
    author: string
    duration: number
}

const firstSong = {
    name: "The dock of the bay",
    author: "Ottis Redding",
    duration: 3.30
} as Song

const displaySongs = (songs: Song[]):void  => {
    songs.forEach((
        {name, author, duration}, i) => 
            console.log(`song #${i + 1}: \n ${name} \n ${author} \n ${duration}`))
}

displaySongs([firstSong])