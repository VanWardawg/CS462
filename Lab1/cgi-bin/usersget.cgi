#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use utf8;
 
use JSON;

my $json;
{
  local $/; #Enable 'slurp' mode
  open my $fh, "<", "users.json";
  $json = <$fh>;
  close $fh;
}

my $q = CGI->new;
print $q->header('application/json');
print '$json';