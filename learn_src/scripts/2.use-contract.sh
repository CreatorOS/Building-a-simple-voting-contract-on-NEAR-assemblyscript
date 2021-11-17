 #!/usr/bin/env bash

set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

near call $CONTRACT.hdsaleh.testnet addProposal '{"proposal" : "prop"}' --accountId $CONTRACT.hdsaleh.testnet

near view $CONTRACT.hdsaleh.testnet getWinningProposal
exit 0
