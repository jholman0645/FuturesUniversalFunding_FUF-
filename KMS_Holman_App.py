import os
from flask import Flask, jsonify

# Initialize Flask app
app = Flask(__name__)

# Wallet and token data
WALLET_ADDRESS = "0xed6567FD63E3C23e1100eb7B16E1DADf02E08FDa"
TOKEN_SYMBOL = "KMS"
NETWORK = "Solana"
COMPANY_NAME = "KMS Holman - A True Fintech Lending"

@app.route('/')
def index():
    """
    Landing route.
    Returns a welcome message and app details in JSON format.
    """
    return jsonify({
        "message": f"Welcome to {COMPANY_NAME}!",
        "company": COMPANY_NAME,
        "token": TOKEN_SYMBOL,
        "network": NETWORK,
        "wallet_donation": WALLET_ADDRESS,
        "description": "Innovative DeFi lending platform supporting cross-chain integration.",
        "core_values": [
            "Integrity: Highest standards of honesty and ethical conduct",
            "Transparency: Open communication and clear disclosure",
            "Innovation: Cutting-edge fintech solutions",
            "Customer-Centricity: Client success at the heart of everything"
        ]
    })

@app.route('/build')
def build_link():
    """
    Simulated build link for creating or connecting the front-end app.
    Returns deployment info in JSON format.
    """
    build_message = {
        "build_status": "READY",
        "instructions": "Use this link to initiate build deployment.",
        "project_repo": "https://github.com/jholman0645/FuturesUniversalFunding_FUF-",
        "company": COMPANY_NAME,
        "environment": "Development",
        "frontend": "React Native or Flutter compatible"
    }
    return jsonify(build_message)

@app.route('/api/donate')
def donate():
    """
    Donation integration route.
    Returns wallet donation info in JSON format.
    """
    return jsonify({
        "wallet_address": WALLET_ADDRESS,
        "company": COMPANY_NAME,
        "message": "Use this address to contribute and support ongoing innovation."
    })

@app.route('/api/values')
def core_values():
    """
    Returns company core values in JSON format.
    """
    return jsonify({
        "company": COMPANY_NAME,
        "core_values": {
            "integrity": "We maintain the highest standards of honesty and ethical conduct in all our operations",
            "transparency": "We believe in open communication and clear disclosure to build trust with our clients",
            "innovation": "We continuously embrace cutting-edge technology to deliver superior fintech solutions",
            "customer_centricity": "Our clients' success is at the heart of everything we do"
        }
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"{COMPANY_NAME} App running on http://localhost:{port}")
    print("Powered by innovation, driven by integrity.")
    app.run(host='0.0.0.0', port=port, debug=True)
