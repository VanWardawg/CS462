#!/usr/bin/perl
use strict;
use warnings;

use CGI;

my $q = new CGI;

print $q->header('text/html');