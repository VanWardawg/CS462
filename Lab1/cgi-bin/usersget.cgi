#!/usr/bin/perl
use strict;
use warnings;
use CGI;

open(FH,"users.json") or &dienice("Can\"t open guestbook.txt: $!");
my @ary = <FH>;
close(FH);

foreach my $line (@ary) {
    print $line;
}

my $q = CGI->new;
print $q->header('application/json');
print '@ary';
