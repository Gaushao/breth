# Solidity API

## ChipToken

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### TRANSFER_ROLE

```solidity
bytes32 TRANSFER_ROLE
```

### decimalsValue

```solidity
uint8 decimalsValue
```

### constructor

```solidity
constructor(string name_, string symbol_, uint8 decimals_) public
```

_Initializes the ChipToken contract with the given name and symbol._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | string | The name of the token. |
| symbol_ | string | The symbol of the token. |
| decimals_ | uint8 |  |

### mint

```solidity
function mint(address to, uint256 amount) public
```

Only accounts with the MINTER_ROLE can call this function.

_Mints a specified amount of chips to the given address.
Mints chips with the specified decimals._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The address to mint chips to. |
| amount | uint256 | The amount of chips to mint. |

### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

_Returns the number of decimals for the token._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | The number of decimals for the token. |

