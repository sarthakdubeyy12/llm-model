from agents.utils import get_input_from_context

def handle_output(node, edges, context):
    return get_input_from_context(node["id"], edges, context)