#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $q = CGI->new;
my %headers = map { $_ => $q->http($_) } $q->http();

print $q->header('text/plain');
print "Got the following headers:\n";
for my $header ( keys %headers ) {
    print "$header: $headers{$header}\n";
}

print "Got the following query params\n";
my @names = $query->param;
for $name ( @names ) { 
	if ( $name =~ /\_/ ) { next; } else { print "".$name."\t=\t".$query->param($name) . "\n"; 
} 

print "Got the following post data\n";
my $xml = $q->param( 'POSTDATA' );
print "$xml\n";