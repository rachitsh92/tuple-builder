// ─── ACTUAL SCHEMA (from your Permify response) ────────────────────────────

const RAW_SCHEMA = {
	"schema": {
		"entity_definitions": {
			"company": {
				"name": "company",
				"relations": {
					"checker": {
						"name": "checker",
						"relation_references": [
							{
								"type": "corporate_customer",
								"relation": ""
							}
						]
					},
					"maker": {
						"name": "maker",
						"relation_references": [
							{
								"type": "corporate_customer",
								"relation": ""
							}
						]
					}
				},
				"permissions": {
					"approve_trade": {
						"name": "approve_trade",
						"child": {
							"rewrite": {
								"rewrite_operation": "OPERATION_UNION",
								"children": [
									{
										"leaf": {
											"computed_user_set": {
												"relation": "approve_trade_for_maker"
											}
										}
									},
									{
										"leaf": {
											"computed_user_set": {
												"relation": "approve_trade_for_checker"
											}
										}
									}
								]
							}
						}
					},
					"approve_trade_for_checker": {
						"name": "approve_trade_for_checker",
						"child": {
							"rewrite": {
								"rewrite_operation": "OPERATION_INTERSECTION",
								"children": [
									{
										"rewrite": {
											"rewrite_operation": "OPERATION_INTERSECTION",
											"children": [
												{
													"leaf": {
														"computed_user_set": {
															"relation": "checker"
														}
													}
												},
												{
													"leaf": {
														"tuple_to_user_set": {
															"tupleSet": {
																"relation": "checker"
															},
															"computed": {
																"relation": "is_active"
															}
														}
													}
												}
											]
										}
									},
									{
										"rewrite": {
											"rewrite_operation": "OPERATION_UNION",
											"children": [
												{
													"leaf": {
														"call": {
															"rule_name": "is_amount_within_limits",
															"arguments": [
																{
																	"computed_attribute": {
																		"name": "maker_transaction_limit"
																	}
																}
															]
														}
													}
												},
												{
													"leaf": {
														"call": {
															"rule_name": "is_signatories_signed",
															"arguments": [
																{
																	"computed_attribute": {
																		"name": "required_signatories_count"
																	}
																}
															]
														}
													}
												}
											]
										}
									}
								]
							}
						}
					},
					"approve_trade_for_maker": {
						"name": "approve_trade_for_maker",
						"child": {
							"rewrite": {
								"rewrite_operation": "OPERATION_INTERSECTION",
								"children": [
									{
										"rewrite": {
											"rewrite_operation": "OPERATION_INTERSECTION",
											"children": [
												{
													"leaf": {
														"computed_user_set": {
															"relation": "maker"
														}
													}
												},
												{
													"leaf": {
														"tuple_to_user_set": {
															"tupleSet": {
																"relation": "maker"
															},
															"computed": {
																"relation": "is_active"
															}
														}
													}
												}
											]
										}
									},
									{
										"leaf": {
											"call": {
												"rule_name": "is_amount_within_limits",
												"arguments": [
													{
														"computed_attribute": {
															"name": "maker_transaction_limit"
														}
													}
												]
											}
										}
									}
								]
							}
						}
					}
				},
				"attributes": {
					"maker_transaction_limit": {
						"name": "maker_transaction_limit",
						"type": "ATTRIBUTE_TYPE_INTEGER"
					},
					"required_signatories_count": {
						"name": "required_signatories_count",
						"type": "ATTRIBUTE_TYPE_INTEGER"
					}
				},
				"references": {
					"approve_trade": "REFERENCE_PERMISSION",
					"approve_trade_for_checker": "REFERENCE_PERMISSION",
					"approve_trade_for_maker": "REFERENCE_PERMISSION",
					"checker": "REFERENCE_RELATION",
					"maker": "REFERENCE_RELATION",
					"maker_transaction_limit": "REFERENCE_ATTRIBUTE",
					"required_signatories_count": "REFERENCE_ATTRIBUTE"
				}
			},
			"corporate_customer": {
				"name": "corporate_customer",
				"relations": {
					"member": {
						"name": "member",
						"relation_references": [
							{
								"type": "user",
								"relation": ""
							}
						]
					}
				},
				"permissions": {
					"is_active": {
						"name": "is_active",
						"child": {
							"leaf": {
								"call": {
									"rule_name": "is_corporate_customer_active",
									"arguments": [
										{
											"computed_attribute": {
												"name": "status"
											}
										}
									]
								}
							}
						}
					}
				},
				"attributes": {
					"status": {
						"name": "status",
						"type": "ATTRIBUTE_TYPE_STRING"
					}
				},
				"references": {
					"is_active": "REFERENCE_PERMISSION",
					"member": "REFERENCE_RELATION",
					"status": "REFERENCE_ATTRIBUTE"
				}
			},
			"organization": {
				"name": "organization",
				"relations": {
					"admin": {
						"name": "admin",
						"relation_references": [
							{
								"type": "user",
								"relation": ""
							}
						]
					},
					"checker": {
						"name": "checker",
						"relation_references": [
							{
								"type": "user",
								"relation": ""
							}
						]
					},
					"maker": {
						"name": "maker",
						"relation_references": [
							{
								"type": "user",
								"relation": ""
							}
						]
					}
				},
				"permissions": {
					"approve_corporate_customer": {
						"name": "approve_corporate_customer",
						"child": {
							"rewrite": {
								"rewrite_operation": "OPERATION_UNION",
								"children": [
									{
										"leaf": {
											"computed_user_set": {
												"relation": "admin"
											}
										}
									},
									{
										"leaf": {
											"computed_user_set": {
												"relation": "checker"
											}
										}
									}
								]
							}
						}
					},
					"create_corporate_customer": {
						"name": "create_corporate_customer",
						"child": {
							"rewrite": {
								"rewrite_operation": "OPERATION_UNION",
								"children": [
									{
										"leaf": {
											"computed_user_set": {
												"relation": "admin"
											}
										}
									},
									{
										"leaf": {
											"computed_user_set": {
												"relation": "maker"
											}
										}
									}
								]
							}
						}
					},
					"manage_corporate_customer": {
						"name": "manage_corporate_customer",
						"child": {
							"leaf": {
								"computed_user_set": {
									"relation": "admin"
								}
							}
						}
					}
				},
				"attributes": {},
				"references": {
					"admin": "REFERENCE_RELATION",
					"approve_corporate_customer": "REFERENCE_PERMISSION",
					"checker": "REFERENCE_RELATION",
					"create_corporate_customer": "REFERENCE_PERMISSION",
					"maker": "REFERENCE_RELATION",
					"manage_corporate_customer": "REFERENCE_PERMISSION"
				}
			},
			"user": {
				"name": "user",
				"relations": {},
				"permissions": {},
				"attributes": {},
				"references": {}
			}
		},
		"rule_definitions": {
			"is_amount_within_limits": {
				"name": "is_amount_within_limits",
				"arguments": {
					"maker_transaction_limit": "ATTRIBUTE_TYPE_INTEGER"
				},
				"expression": {
					"reference_map": {
						"1": {
							"name": "context",
							"overload_id": [],
							"value": null
						},
						"4": {
							"name": "",
							"overload_id": [
								"less_equals_int64"
							],
							"value": null
						},
						"5": {
							"name": "maker_transaction_limit",
							"overload_id": [],
							"value": null
						}
					},
					"type_map": {
						"1": {
							"dyn": {}
						},
						"2": {
							"dyn": {}
						},
						"3": {
							"dyn": {}
						},
						"4": {
							"primitive": "BOOL"
						},
						"5": {
							"primitive": "INT64"
						}
					},
					"source_info": {
						"syntax_version": "",
						"location": "<input>",
						"line_offsets": [
							1,
							2,
							61
						],
						"positions": {
							"1": 2,
							"2": 9,
							"3": 14,
							"4": 34,
							"5": 37
						},
						"macro_calls": {},
						"extensions": []
					},
					"expr_version": "",
					"expr": {
						"id": "4",
						"call_expr": {
							"target": null,
							"function": "_<=_",
							"args": [
								{
									"id": "3",
									"select_expr": {
										"operand": {
											"id": "2",
											"select_expr": {
												"operand": {
													"id": "1",
													"ident_expr": {
														"name": "context"
													}
												},
												"field": "data",
												"test_only": false
											}
										},
										"field": "transaction_amount",
										"test_only": false
									}
								},
								{
									"id": "5",
									"ident_expr": {
										"name": "maker_transaction_limit"
									}
								}
							]
						}
					}
				}
			},
			"is_corporate_customer_active": {
				"name": "is_corporate_customer_active",
				"arguments": {
					"status": "ATTRIBUTE_TYPE_STRING"
				},
				"expression": {
					"reference_map": {
						"1": {
							"name": "status",
							"overload_id": [],
							"value": null
						},
						"2": {
							"name": "",
							"overload_id": [
								"equals"
							],
							"value": null
						}
					},
					"type_map": {
						"1": {
							"primitive": "STRING"
						},
						"2": {
							"primitive": "BOOL"
						},
						"3": {
							"primitive": "STRING"
						}
					},
					"source_info": {
						"syntax_version": "",
						"location": "<input>",
						"line_offsets": [
							1,
							2,
							21
						],
						"positions": {
							"1": 2,
							"2": 9,
							"3": 12
						},
						"macro_calls": {},
						"extensions": []
					},
					"expr_version": "",
					"expr": {
						"id": "2",
						"call_expr": {
							"target": null,
							"function": "_==_",
							"args": [
								{
									"id": "1",
									"ident_expr": {
										"name": "status"
									}
								},
								{
									"id": "3",
									"const_expr": {
										"string_value": "active"
									}
								}
							]
						}
					}
				}
			},
			"is_signatories_signed": {
				"name": "is_signatories_signed",
				"arguments": {
					"required_signatories_count": "ATTRIBUTE_TYPE_INTEGER"
				},
				"expression": {
					"reference_map": {
						"1": {
							"name": "context",
							"overload_id": [],
							"value": null
						},
						"4": {
							"name": "",
							"overload_id": [
								"greater_equals_int64"
							],
							"value": null
						},
						"5": {
							"name": "required_signatories_count",
							"overload_id": [],
							"value": null
						}
					},
					"type_map": {
						"1": {
							"dyn": {}
						},
						"2": {
							"dyn": {}
						},
						"3": {
							"dyn": {}
						},
						"4": {
							"primitive": "BOOL"
						},
						"5": {
							"primitive": "INT64"
						}
					},
					"source_info": {
						"syntax_version": "",
						"location": "<input>",
						"line_offsets": [
							1,
							2,
							72
						],
						"positions": {
							"1": 2,
							"2": 9,
							"3": 14,
							"4": 42,
							"5": 45
						},
						"macro_calls": {},
						"extensions": []
					},
					"expr_version": "",
					"expr": {
						"id": "4",
						"call_expr": {
							"target": null,
							"function": "_>=_",
							"args": [
								{
									"id": "3",
									"select_expr": {
										"operand": {
											"id": "2",
											"select_expr": {
												"operand": {
													"id": "1",
													"ident_expr": {
														"name": "context"
													}
												},
												"field": "data",
												"test_only": false
											}
										},
										"field": "signatories_approved_count",
										"test_only": false
									}
								},
								{
									"id": "5",
									"ident_expr": {
										"name": "required_signatories_count"
									}
								}
							]
						}
					}
				}
			}
		},
		"references": {
			"company": "REFERENCE_ENTITY",
			"corporate_customer": "REFERENCE_ENTITY",
			"is_amount_within_limits": "REFERENCE_RULE",
			"is_corporate_customer_active": "REFERENCE_RULE",
			"is_signatories_signed": "REFERENCE_RULE",
			"organization": "REFERENCE_ENTITY",
			"user": "REFERENCE_ENTITY"
		}
	}
};

// ─── PARSER ────────────────────────────────────────────────────────────────

function parseSchema(apiResponse) {
  const entityDefs = apiResponse.schema.entity_definitions;
  const entities = [];

  for (const [entityName, entityData] of Object.entries(entityDefs)) {
    // Parse relations
    const relations = [];
    for (const [relName, relData] of Object.entries(entityData.relations || {})) {
      const refs = relData.relation_references || [];
      refs.forEach(ref => {
        relations.push({
          name: relName,
          type: ref.type
        });
      });
    }

    // Parse permissions (just the names)
    const permissions = Object.keys(entityData.permissions || {});

    // Figure out which permissions each relation grants
    // We look at permission names to infer this
    const relationsWithPerms = relations.map(rel => {
      const grants = permissions.filter(p =>
        p.includes(rel.name) || p === 'is_active'
      );
      return { ...rel, grants };
    });

    entities.push({
      name: entityName,
      relations: relationsWithPerms,
      permissions
    });
  }

  // Filter out entities with no relations (like "user") for the resource dropdown
  // but keep them available as subject types
  return entities;
}

// ─── STATE ─────────────────────────────────────────────────────────────────

const entities = parseSchema(RAW_SCHEMA);
let state = {
  entityType: '',
  entityId: '',
  relation: null,
  subjectType: '',
  subjectId: ''
};

// ─── INIT ──────────────────────────────────────────────────────────────────

function init() {
  const select = document.getElementById('entitySelect');

  // Populate resource dropdown from parsed entities
  // Only show entities that HAVE relations (can be a resource)
  entities
    .filter(e => e.relations.length > 0)
    .forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.name;
      opt.textContent = e.name;
      select.appendChild(opt);
    });
}

// ─── STEP 1: Entity selected ───────────────────────────────────────────────

function onEntityChange() {
  const val = document.getElementById('entitySelect').value;
  state.entityType = val;
  state.relation = null;
  state.subjectType = '';
  state.subjectId = '';

  // Reset downstream
  resetStep(2);
  resetStep(3);
  hidePreview();

  if (!val) return;

  // Find entity in parsed schema
  const entity = entities.find(e => e.name === val);
  if (!entity) return;

  // Unlock step 2 and render relation cards
  unlockStep(2);
  renderRelations(entity);
  updateStepBar(1, 'done');
  updateStepBar(2, 'active');
}

function onEntityIdChange() {
  state.entityId = document.getElementById('entityId').value;
  updatePreviewIfReady();
}

// ─── STEP 2: Render relations ──────────────────────────────────────────────

function renderRelations(entity) {
  const container = document.getElementById('relationContent');
  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'relation-grid animate-in';

  entity.relations.forEach(rel => {
    const card = document.createElement('div');
    card.className = 'rel-card';
    card.id = `rel-${rel.name}`;
    card.onclick = () => onRelationSelect(rel, entity);

    // Permissions this relation appears in
    const permList = entity.permissions
      .filter(p => p.toLowerCase().includes(rel.name))
      .slice(0, 3);

    card.innerHTML = `
      <div class="rel-card-name">${rel.name}</div>
      <div class="rel-card-type">→ ${rel.type}</div>
      <div class="rel-card-perms">
        ${permList.map(p => `<div class="perm-item">${p}</div>`).join('')}
        ${permList.length === 0 ? `<div class="perm-item" style="color:#6b7280; font-style:italic;">linked resource</div>` : ''}
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── STEP 2: Relation selected ─────────────────────────────────────────────

function onRelationSelect(rel, entity) {
  // Deselect all cards
  document.querySelectorAll('.rel-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`rel-${rel.name}`).classList.add('selected');

  state.relation = rel;
  state.subjectType = rel.type;  // AUTO-FILLED from relation definition!
  state.subjectId = '';

  // Unlock step 3 and render subject input
  unlockStep(3);
  renderSubjectInput(rel);
  updateStepBar(2, 'done');
  updateStepBar(3, 'active');
  hidePreview();
}

// ─── STEP 3: Render subject input ─────────────────────────────────────────

function renderSubjectInput(rel) {
  const container = document.getElementById('subjectContent');

  container.innerHTML = `
    <div class="field-group animate-in">
      <div class="field">
        <label>Subject Type <span class="auto-badge">AUTO-FILLED</span></label>
        <input type="text" value="${rel.type}" disabled style="opacity:0.6; cursor:not-allowed;" />
        <div class="field-hint">Determined by the relation definition</div>
      </div>
      <div class="field">
        <label>Subject ID</label>
        <input
          type="text"
          id="subjectId"
          placeholder="e.g. user_alice"
          oninput="onSubjectIdChange()"
          autofocus
        />
        <div class="field-hint">The specific ${rel.type} ID</div>
      </div>
    </div>
  `;
}

function onSubjectIdChange() {
  state.subjectId = document.getElementById('subjectId').value;
  updatePreviewIfReady();
}

// ─── STEP 4: Preview ───────────────────────────────────────────────────────

function updatePreviewIfReady() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;

  if (!entityType || !entityId || !relation || !subjectType || !subjectId) {
    hidePreview();
    return;
  }

  showPreview();
}

function showPreview() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;

  const entityStr  = `${entityType}:${entityId}`;
  const relationStr = relation.name;
  const subjectStr  = `${subjectType}:${subjectId}`;
  const tupleStr    = `${entityStr}#${relationStr}@${subjectStr}`;

  // Plain English
  document.getElementById('plainEnglish').innerHTML =
    `<strong>${subjectType} "${subjectId}"</strong> will have <strong>${relationStr}</strong> access on <strong>${entityType} "${entityId}"</strong>`;

  // JSON structure
  const tupleObj = {
    entity:   { type: entityType, id: entityId },
    relation: relationStr,
    subject:  { type: subjectType, id: subjectId }
  };
  document.getElementById('tupleJson').textContent = JSON.stringify(tupleObj, null, 2);

  const preview = document.getElementById('step4');
  if (!preview.classList.contains('visible')) {
    preview.classList.add('visible', 'animate-in');
  }

  updateStepBar(3, 'done');
  updateStepBar(4, 'active');
}

function hidePreview() {
  document.getElementById('step4').classList.remove('visible');
  updateStepBar(4, '');
  if (state.relation === null) updateStepBar(3, '');
}

// ─── HELPERS ───────────────────────────────────────────────────────────────

function unlockStep(num) {
  document.getElementById(`step${num}`).classList.remove('locked');
  document.getElementById(`step${num}`).classList.add('active-card');
}

function resetStep(num) {
  const card = document.getElementById(`step${num}`);
  card.classList.add('locked');
  card.classList.remove('active-card');
  const lockMessages = { 2: '🔒 Select a resource first', 3: '🔒 Select a relation first' };
  const contentId = num === 2 ? 'relationContent' : 'subjectContent';
  document.getElementById(contentId).innerHTML = `<div class="lock-msg">${lockMessages[num]}</div>`;
  updateStepBar(num, '');
}

function updateStepBar(num, status) {
  const circle = document.getElementById(`sc${num}`);
  const label  = document.getElementById(`sl${num}`);
  const connPrev = document.getElementById(`conn${num - 1}`);

  circle.className = 'step-circle';
  label.className  = 'step-label';

  if (status === 'active') {
    circle.classList.add('active');
    label.classList.add('active');
  } else if (status === 'done') {
    circle.classList.add('done');
    circle.textContent = '✓';
    label.classList.add('done');
    if (connPrev) connPrev.classList.add('done');
  } else {
    circle.textContent = `0${num}`;
  }
}

function resetForm() {
  state = { entityType: '', entityId: '', relation: null, subjectType: '', subjectId: '' };

  document.getElementById('entitySelect').value = '';
  document.getElementById('entityId').value = '';

  resetStep(2);
  resetStep(3);
  hidePreview();

  // Reset step bar
  [1,2,3,4].forEach(n => {
    const c = document.getElementById(`sc${n}`);
    const l = document.getElementById(`sl${n}`);
    c.className = 'step-circle';
    c.textContent = `0${n}`;
    l.className = 'step-label';
  });
  document.querySelectorAll('.step-connector').forEach(c => c.classList.remove('done'));
  document.getElementById('sc1').classList.add('active');
  document.getElementById('sl1').classList.add('active');

  document.getElementById('step1').classList.add('active-card');
}

function copyTuple() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;
  const str = `${entityType}:${entityId}#${relation.name}@${subjectType}:${subjectId}`;
  navigator.clipboard.writeText(str).then(() => showToast('Tuple copied!'));
}

function createPolicy() {
  showToast('✓ Tuple created successfully');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Init on load
init();
