#!/usr/bin/perl
use strict;
use warnings;
use CGI;
 

use JSON::Parse 'json_file_to_perl';
my $p = json_file_to_perl ('user.json');

my $q = CGI->new;
print $q->header('application/json');
print '$p';
