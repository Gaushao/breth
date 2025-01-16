RPC_URL=$(kurtosis enclave inspect brethnet | grep "rpc: 8545/tcp" | grep -oh "127.0.0.1:[0-9]*" | head -n 1)

sed -i "s|^RPC_URL=.*|RPC_URL=http://$RPC_URL|" ../../.env

GREEN='\033[32m'
YELLOW='\033[33m'
RESET='\033[0m'
echo -e $GREEN UPDATED .env "->" $YELLOW RPC_URL=$RPC_URL $RESET "\n"