# src/constants.py

"""
PiEcosystemHub Configuration Constants
This module contains constants related to the PiEcosystemHub, a platform for integrating decentralized applications (dApps) within the Pi Network.
"""

# General Configuration
PI_ECOSYSTEM_HUB_VERSION = "1.0.0"  # Current version of the PiEcosystemHub application
PI_ECOSYSTEM_HUB_RELEASE_DATE = "2025-01-10"  # Release date of the current version
PI_ECOSYSTEM_HUB_NAME = "PiEcosystemHub"  # Name of the application
PI_ECOSYSTEM_HUB_DESCRIPTION = "A comprehensive platform for integrating decentralized applications (dApps) within the Pi Network."  # Description of the application

# Pi Coin Configuration
PI_COIN_SYMBOL = "PI"  # Symbol for Pi Coin
PI_COIN_VALUE = 314159.00  # Fixed value of Pi Coin in USD
PI_COIN_SUPPLY = 100_000_000_000  # Total supply of Pi Coin
PI_COIN_DYNAMIC_SUPPLY = False  # Disable dynamic supply adjustments for stability

# Stablecoin Mechanisms
PI_COIN_IS_STABLECOIN = True  # Indicates that Pi Coin is a stablecoin
PI_COIN_STABILITY_MECHANISM = "Collateralized"  # Mechanism for maintaining stability
PI_COIN_COLLATERAL_RATIO = 1.5  # Collateralization ratio (1.5 means $1.50 in collateral for every $1 of Pi Coin)
PI_COIN_RESERVE_ASSETS = ["USD", "BTC", "ETH"]  # List of assets backing the stablecoin

# Transaction Fees
PI_COIN_TRANSACTION_FEE = 0.005  # Transaction fee in USD
PI_COIN_TRANSACTION_FEE_ADJUSTMENT = 0.0005  # Dynamic adjustment factor for transaction fees

# Block Configuration
PI_COIN_BLOCK_TIME = 5  # Average block time in seconds for faster transactions
PI_COIN_BLOCK_TIME_ADJUSTMENT = 0.5  # Adjustment factor for block time based on network load

# Mining Configuration
PI_COIN_MINING_DIFFICULTY = 500  # Reduced difficulty for increased mining participation
PI_COIN_MINING_DIFFICULTY_ADJUSTMENT = 0.05  # Adjustment factor for mining difficulty
PI_COIN_MINING_REWARD = 25  # Increased reward for mining a block
PI_COIN_MINING_REWARD_ADJUSTMENT = 1.0  # Dynamic adjustment for mining rewards

# Network Protocol
PI_COIN_NETWORK_PROTOCOL = "PoS"  # Proof of Stake for energy efficiency
PI_COIN_NETWORK_PROTOCOL_VERSION = "2.0.0"  # Updated version of the network protocol

# Transaction Configuration
PI_COIN_MAX_TRANSACTION_SIZE = 2_000_000  # Increased maximum transaction size in bytes
PI_COIN_DECIMALS = 18  # Number of decimal places for Pi Coin

# Genesis Block Configuration
PI_COIN_GENESIS_BLOCK_TIMESTAMP = "2025-01-01T00:00:00Z"  # Timestamp of the genesis block

# Governance Model
PI_COIN_GOVERNANCE_MODEL = "Decentralized"  # Governance model for Pi Coin
PI_COIN_GOVERNANCE_VOTING_PERIOD = 1_209_600  # Voting period in seconds, 2 weeks

# Security Features
PI_COIN_ENCRYPTION_ALGORITHM = "AES-512"  # Enhanced encryption algorithm for securing transactions
PI_COIN_HASHING_ALGORITHM = "SHA-3"  # Advanced hashing algorithm for block verification
PI_COIN_SIGNATURE_SCHEME = "EdDSA"  # More secure digital signature scheme for transaction signing
PI_COIN_SECURITY_AUDIT_INTERVAL = 43200  # Security audit interval in seconds, 12 hours

# Network Parameters
PI_COIN_MAX_PEERS = 500  # Increased maximum number of peers in the network
PI_COIN_NODE_TIMEOUT = 15  # Reduced timeout for node responses in seconds
PI_COIN_CONNECTION_RETRY_INTERVAL = 2  # Reduced retry interval for node connections in seconds

# Staking Parameters
PI_COIN_STAKING_REWARD = 0.1  # Reward for staking Pi Coins
PI_COIN_MINIMUM_STAKE = 100  # Minimum amount required to stake
PI_COIN_STAKING_PERIOD = 604800  # Staking period in seconds, 1 week
PI_COIN_STAKING_REWARD_ADJUSTMENT = 0.01  # Dynamic adjustment for staking rewards

# Advanced # Advanced Features
PI_COIN_ADVANCED_FEATURES_ENABLED = True  # Flag to enable advanced features
PI_COIN_FEATURES_LIST = ["Smart Contracts", "Decentralized Governance", "Cross-Chain Interoperability"]  # List of advanced features available

# Community Engagement
PI_COIN_COMMUNITY_VOTING_THRESHOLD = 0.05  # Minimum percentage of votes required for community proposals to pass
PI_COIN_COMMUNITY_PROPOSAL_DURATION = 604800  # Duration for community proposals in seconds, 1 week

# API Configuration
PI_COIN_API_BASE_URL = "https://api.piecosystemhub.com"  # Base URL for the API
PI_COIN_API_TIMEOUT = 10  # Timeout for API requests in seconds

# Logging Configuration
PI_COIN_LOGGING_LEVEL = "DEBUG"  # Logging level for the application
PI_COIN_LOGGING_FILE = "piecosystemhub.log"  # Log file name

# User Interface Configuration
PI_COIN_UI_THEME = "dark"  # Default theme for the user interface
PI_COIN_UI_LANGUAGE = "en"  # Default language for the user interface

# End of constants.py

