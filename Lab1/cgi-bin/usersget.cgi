#!/usr/bin/perl
use strict;
use warnings;
use CGI;
 

use lib qw(..);

use JSON qw( );

my $filename = 'users.json';

my $json_text = do {
   open(my $json_fh, "<:encoding(UTF-8)", $filename)
      or die("Can't open \$filename\": $!\n");
   local $/;
   <$json_fh>
};

my $json = JSON->new;
my $data = $json->decode($json_text);

my $q = CGI->new;
print $q->header('application/json');
print '$json_text';
