
ruleset song_store {
  meta {
    name "Song Store"
    description <<
A song store ruleset for the Lab5
>>
    author "Kevin"
    logging on
    sharing on
    provides songs, hymns, secular_music
  }
  global {
    songs = function() {
      return songs;
    };
    hymns = function() {
      return hymns;
    };
    secular_music = function() {
      //return song from songs not in hymns
    }
  }

  rule collect_songs is active {
    select when explicit sung song "(.*)" setting(s)
    fired {
      //save song to songs entity variable
    }
  }

  rule collect_hymns is active {
    select when explict found_hymn hymn "(.*)" setting(h)
    fired {
      //save hymn to hymns entity variable
    }
  }

  rule clear_songs is active {
    select when song clear
    fired {
      //clear songs and hymns entity variable
    }
  }
 
}