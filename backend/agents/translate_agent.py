from agents.utils import call_openrouter_llm, get_input_from_context

def handle_translate(node, edges, context):
    text = get_input_from_context(node["id"], edges, context)
    return call_openrouter_llm(f"Translate to Hindi:\n{text}")