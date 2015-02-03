#!/usr/bin/perl
use strict;
use warnings;
use CGI;
 

use lib qw(..);

use JSON qw( );

my $json;
{
  local $/; #Enable 'slurp' mode
  open my $fh, "<", "data.json";
  $json = <$fh>;
  close $fh;
}
my $data = decode_json($json);

my $q = CGI->new;
print $q->header('application/json');
print '$data';
