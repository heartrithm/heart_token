def test_attributess(accounts, token):
    # 💓
    assert token.name() == "HeartRithm"
    assert token.decimals() == 18
    assert token.symbol() == "HEART"
