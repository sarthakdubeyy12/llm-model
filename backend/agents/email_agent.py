from agents.utils import get_input_from_context

def handle_email(node, edges, context):
    email_body = get_input_from_context(node["id"], edges, context)
    return f"[Email Sent]: {email_body}"