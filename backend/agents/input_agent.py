# agents/input_agent.py
def handle_input(node, context):
    return node["data"].get("value", "default_input")