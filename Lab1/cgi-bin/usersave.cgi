#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $q = CGI->new;

my $xml = $q->param( 'POSTDATA' );

open(OUTFILE, "<users.json") || die "could not open output file"; 

print OUTFILE "$xml\n"; ## Notice, there is not a comma after the file handle and the string to be output 

close(OUTFILE);

print $q->header('text/plain');
print "Success";