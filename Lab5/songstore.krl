
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
      ent:songs
    };
    hymns = function() {
      ent:hymns
    };
    secular_music = function() {
      ent:songs.difference(ent:hymns)
    };
  }

  rule collect_songs is active {
    select when explicit sung song "(.*)" setting(s)
    pre {
      songs = ent:songs || [];
      song = {"song":s,"timestamp":time:now()};
      songs = songs.append(song);
    }
    fired {
      set ent:songs songs;
      log "Song Sung" + s
    }
  }

  rule collect_hymns is active {
    select when explicit found_hymn hymn "(.*)" setting(h)
    pre {
      hymns = ent:hymns || [];
      hymn = {"hymn":h,"timestamp":time:now()};
      hymns = hymns.append(hymn);
    }
    fired {
      log "Hymn Sung" + h
    }
  }

  rule clear_songs is active {
    select when song cleared
    fired {
      clear ent:hymns;
      clear ent:songs;
      log "Hymns and songs cleared"
    }
  }
 
}