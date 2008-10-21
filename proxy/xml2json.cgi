#!/usr/bin/perl

use strict;
use warnings;
use XML::Simple;
use LWP::Simple;
use JSON::Syck;
use URI::Escape;
use CGI;
use CGI::Carp qw(fatalsToBrowser);

require "cgi-lib.pl";

my $q = CGI->new;

my ($city, $callback);
#if ($q->path_info =~ m{^/([^/]+)/(.*)}o) {
#	$callback = $1;
#	$city = $2;
#}
#else {
#	print $q->header(-status => '400 Bad Request');
#	exit;
#}

my %input;
&ReadParse(\%input);


my $url = sprintf 'http://jlp.yahooapis.jp/JIMService/V1/conversion?appid=9d57bed1f5e0adfaf6834ccdad0b6b5f&sentence=%s', uri_escape($input{'sentence'});
my $ref = XMLin(get($url));

print $q->header(-type => 'application/x-javascript; charset=utf-8');
printf "if(typeof(temp_YahooAPI_VJE)=='undefined') temp_YahooAPI_VJE = {};\n";
printf "temp_YahooAPI_VJE.data = ";
printf '%s(%s);', $callback, JSON::Syck::Dump($ref);
printf "\n";
printf "if(typeof(temp_YahooAPI_VJE.onload)=='function') temp_YahooAPI_VJE.onload(temp_YahooAPI_VJE.data);";
