def handle_text(node, context):
    raw = node["data"].get("text", "")
    for k, v in context.items():
        raw = raw.replace(f"{{{{{k}}}}}", str(v))
    return raw