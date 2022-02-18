pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
import "@chainlink/contracts/src/v0.8/Denominations.sol";

contract DustSweeper is Ownable {
  using SafeERC20 for IERC20;

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event logBool(bool indexed owner);

  uint256 public takerFee;
  uint256 public protocolFee;
  address public protocolWallet;
  address public protocolToken;
  uint256 public tokenDrop; // tokens per wei

  // ChainLink
  address public chainLinkRegistry;
  // mainnet 0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf
  // kovan 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
  address quoteETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
  address quoteUSD = 0x0000000000000000000000000000000000000348;

  constructor(
    address _chainLinkRegistry,
    address _protocolWallet,
    address _protocolToken,
    uint8 _takerFee,
    uint8 _protocolFee,
    uint256 _tokenDrop
  ) {
    chainLinkRegistry = _chainLinkRegistry;
    protocolWallet = _protocolWallet;
    protocolToken = _protocolToken;
    takerFee = _takerFee;
    protocolFee = _protocolFee;
    tokenDrop = _tokenDrop;
  }

  function sweepDust(
    address[] calldata makers,
    address[] calldata tokenAddresses
  ) external payable {
    uint256 ethSent = msg.value;
    uint256 totalNativeAmount = 0;
    for (uint256 i = 0; i < makers.length; i++) {
      // Amount of Tokens to transfer
      uint256 allowance = IERC20(tokenAddresses[i]).allowance(makers[i], address(this));

      // Equivalent amount of Native Tokens
      uint256 nativeAmt = allowance * uint256(getPrice(tokenAddresses[i], quoteETH)) / 10**18;
      totalNativeAmount = totalNativeAmount + nativeAmt;

      // Amount of Native Tokens to transfer
      uint256 distribution = nativeAmt * ( 10**4 - ( takerFee + protocolFee) ) / 10**4;

      // Taker sends Native Token to Maker
      payable(makers[i]).transfer(distribution);
      ethSent -= distribution;

      // DustSweeper sends Maker's tokens to Taker
      IERC20(tokenAddresses[i]).transferFrom(makers[i], msg.sender, allowance );
    }

    // Taker sends Native Token to Protocol
    uint256 protocolFee = totalNativeAmount * protocolFee / 10**4;
    ethSent -= protocolFee;
    payable(protocolWallet).transfer(protocolFee);

    // Pay any overage back to msg.sender
    if (ethSent > 0) {
      payable(msg.sender).transfer(ethSent);
    }
  }

  function setTakerFee(uint256 _takerFee) external onlyOwner {
    takerFee = _takerFee;
  }

  function setProtocolFee(uint256 _protocolFee) external onlyOwner {
    protocolFee = _protocolFee;
  }

  function setTokenDrop(uint256 _tokenDrop) external onlyOwner {
    tokenDrop = _tokenDrop;
  }

  /**
   * Returns the latest price from Chainlink
   */
  function getPrice(address base, address quote) public view returns (int256) {
    (
    uint80 roundID,
    int256 price,
    uint256 startedAt,
    uint256 timeStamp,
    uint80 answeredInRound
    ) = FeedRegistryInterface(chainLinkRegistry).latestRoundData(base, quote);
    return price;
  }

}
