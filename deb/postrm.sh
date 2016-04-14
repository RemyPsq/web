#!/bin/bash

# delete rule if exists
if iptables -S PREROUTING -t nat | grep -q -- '-A PREROUTING -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080'; then
  iptables -D PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports 8080
fi